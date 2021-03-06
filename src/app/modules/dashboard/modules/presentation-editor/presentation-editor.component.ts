import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { withLatestFrom } from 'rxjs/operators';
import { AddColumnFromAnotherColumn, AddColumnFromLibrary } from 'src/app/modules/dashboard/modules/presentation-editor/store/actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { selectAmountOfColumns, selectColumns, selectIsLibrarySliderOpen } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { ActivatedRoute } from '@angular/router';
import { Column, Slide } from 'src/app/shared/interfaces';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/column/column-title/column-title.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-editor',
	templateUrl: './presentation-editor.component.html',
	styleUrls: [ './presentation-editor.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationEditorComponent extends DropZoneBase implements OnInit, OnDestroy {

	public columns$: Observable<Column[]>;
	public amountOfColumns$: Observable<number>;
	public isLibrarySliderOpen$: Observable<boolean>;
	public presentationId: number;

	constructor(
		private componentFactoryService: ComponentFactoryService,
		private title: Title,
		private activatedRoute: ActivatedRoute,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		this.setTitle();
		this.initObservables();
		this.fetchPresentationId();
	}

	ngOnDestroy() {
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		const { sourceSlideId, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		if (sourceColumnId) {
			this.addColumnFromAnotherColumn(sourceSlideId, sourceColumnId);
		} else {
			this.addColumnFromLibrary(sourceSlideId);
		}
	}

	private setTitle(): void {
		this.title.setTitle('Kreator prezentacji');
	}

	private initObservables(): void {
		this.columns$ = this.store.pipe(select(selectColumns));
		this.amountOfColumns$ = this.store.pipe(select(selectAmountOfColumns));
		this.isLibrarySliderOpen$ = this.store.pipe(select(selectIsLibrarySliderOpen));
	}

	private fetchPresentationId(): void {
		this.presentationId = +this.activatedRoute.snapshot.params['id'];
	}

	private addColumnFromAnotherColumn(sourceSlideId: number, sourceColumnId: number): void {
		this.componentFactoryService.createDynamicComponent<string>(ColumnTitleComponent)
		    .pipe(withLatestFrom(this.store.pipe(select(selectAmountOfColumns))))
		    .subscribe(([ columnTitle, amountOfColumnsInPresentation ]: [ string, number ]) => {
			    this.store.dispatch(new AddColumnFromAnotherColumn({
				    column: this.prepareNewColumn(columnTitle, amountOfColumnsInPresentation),
				    sourceSlideId,
				    sourceColumnId,
			    }));
		    });
	}

	private addColumnFromLibrary(sourceSlideId: number): void {
		this.componentFactoryService.createDynamicComponent<string>(ColumnTitleComponent)
		    .pipe(
			    withLatestFrom(
				    this.store.pipe(select(selectSlideFromLibraryById, { slideId: sourceSlideId })),
				    this.store.pipe(select(selectAmountOfColumns)),
			    ),
		    )
		    .subscribe(([ columnTitle, sourceSlide, amountOfColumnsInPresentation ]: [ string, Slide, number ]) => {
			    this.store.dispatch(new AddColumnFromLibrary({
				    column: this.prepareNewColumn(columnTitle, amountOfColumnsInPresentation),
				    sourceSlide: {
					    ...sourceSlide,
					    id: Math.floor((Math.random() * 10000000) + 1),
					    position: {
						    column: amountOfColumnsInPresentation,
						    order: 0,
					    },
				    },
			    }));
		    });
	}

	private prepareNewColumn(columnTitle: string, amountOfColumnsInPresentation: number): Column {
		return {
			id: this.generateColumnId,
			position: amountOfColumnsInPresentation,
			title: columnTitle,
		};
	}
}
