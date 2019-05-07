import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { first, withLatestFrom } from 'rxjs/operators';
import {
	AddColumnFromAnotherColumn,
	AddColumnFromLibrary,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Column } from 'src/app/shared/interfaces/column';
import { selectAmountOfColumns, selectColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/column.selectors';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { Slide } from 'src/app/shared/interfaces/slide';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';
import { selectIsLibrarySliderOpen } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-options.selectors';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { ActivatedRoute } from '@angular/router';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-creator',
	templateUrl: './presentation-creator.component.html',
	styleUrls: [ './presentation-creator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent extends DropZoneBase implements OnInit, OnDestroy {

	public columns$: Observable<Column[]>;
	public amountOfColumns$: Observable<number>;
	public isLibrarySliderOpen$: Observable<boolean>;
	public presentationId: number;

	constructor(
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
		private componentFactoryBaseService: ComponentFactoryBaseService,
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

	private addColumnFromAnotherColumn(sourceSlideId: number, sourceColumnId: number): void {
		this.presentationCreatorComponentFactoryService.createColumnTitleComponent().columnTitle$
		    .pipe(
			    first(),
			    withLatestFrom(this.store.pipe(select(selectAmountOfColumns))),
		    )
		    .subscribe(([ columnTitle, amountOfColumnsInPresentation ]: [ string, number ]) => {
			    this.store.dispatch(new AddColumnFromAnotherColumn({
				    column: this.prepareNewColumn(columnTitle, amountOfColumnsInPresentation),
				    sourceSlideId,
				    sourceColumnId,
			    }));
		    });
	}

	private addColumnFromLibrary(sourceSlideId: number): void {
		this.presentationCreatorComponentFactoryService.createColumnTitleComponent().columnTitle$
		    .pipe(
			    first(),
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
