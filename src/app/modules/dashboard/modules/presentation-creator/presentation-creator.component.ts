import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { first, switchMap, withLatestFrom } from 'rxjs/operators';
import {
	AddColumnFromAnotherColumn,
	AddColumnFromLibrary,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Column } from 'src/app/shared/interfaces/column';
import { selectAmountOfColumns, selectColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/column.selectors';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { Slide } from 'src/app/shared/interfaces/slide';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';
import {
	selectIsEditorReadyToSave,
	selectIsLibrarySliderOpen,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-options.selectors';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-creator',
	templateUrl: './presentation-creator.component.html',
	styleUrls: [ './presentation-creator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent extends DropZoneBase implements OnInit, OnDestroy {

	public columns$: Observable<Column[]>;
	public isLibrarySliderOpen$: Observable<boolean>;

	constructor(
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private title: Title,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		this.title.setTitle('Kreator prezentacji');
		this.columns$ = this.store.pipe(select(selectColumns));
		this.isLibrarySliderOpen$ = this.store.pipe(select(selectIsLibrarySliderOpen));
	}

	ngOnDestroy() {
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		const { sourceSlideId, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		this.presentationCreatorComponentFactoryService.createColumnTitleComponent().columnTitle$
		    .pipe(
			    first(),
			    withLatestFrom(
				    this.store.pipe(select(selectSlideFromLibraryById, { slideId: sourceSlideId })),
				    this.store.pipe(select(selectAmountOfColumns)),
			    ),
		    )
		    .subscribe(([ columnTitle, sourceSlide, amountOfColumnsInPresentation ]: [ string, Slide, number ]) => {
			    const column: Column = { // przygotuj nowa kolumne
				    id: Math.floor((Math.random() * 10000000) + 1),
				    position: amountOfColumnsInPresentation,
				    title: columnTitle,
			    };

			    if (sourceColumnId) {
				    this.store.dispatch(new AddColumnFromAnotherColumn({
					    column,
					    sourceSlideId,
					    sourceColumnId,
				    }));
			    } else {
				    this.store.dispatch(new AddColumnFromLibrary({
					    column,
					    sourceSlide: {
						    ...sourceSlide,
						    id: Math.floor((Math.random() * 10000000) + 1),
					    },
				    }));
			    }
		    });
	}
}
