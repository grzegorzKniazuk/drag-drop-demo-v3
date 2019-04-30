import { ChangeDetectionStrategy, Component, HostListener, Input, NgZone, OnDestroy } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ColumnDividerSibilings } from 'src/app/shared/interfaces/column-divider-sibilings';
import { isNull, isNumber } from 'lodash';
import {
	AddColumnBetweenExistingColumns,
	AddColumnBetweenExistingColumnsByLibrarySlide,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { first, withLatestFrom } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { selectSlidesById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { Slide } from 'src/app/shared/interfaces/slide';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';

@AutoUnsubscribe()
@Component({
	selector: 'app-column-divider',
	templateUrl: './column-divider.component.html',
	styleUrls: [ './column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDividerComponent extends DropZoneBase implements OnDestroy {

	@Input() columnDividerSibilings: ColumnDividerSibilings;
	@Input() numberOfColumns: number;

	constructor(
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnDestroy() {
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		if (isNumber(sourceColumnId)) { // slajd z prezentacji
			this.addColumnBetweenExistingColumns(sourceSlideId);
		} else if (isNull(sourceColumnId)) { // slajd z biblioteki
			this.addColumnBetweenExistingColumnsByLibrarySlide(sourceSlideId);
		}
	}

	private addColumnBetweenExistingColumns(sourceSlideId: number): void {
		this.presentationCreatorComponentFactoryService.createColumnTitleComponent().columnTitle$.pipe(
			first(),
			withLatestFrom(this.store.pipe(select(selectSlidesById, { slideId: sourceSlideId }))),
		).subscribe(([ columnTitle, sourceSlide ]: [ string, Slide ]) => {
			this.store.dispatch(new AddColumnBetweenExistingColumns({
				column: {
					id: Math.floor((Math.random() * 10000000) + 1),
					position: this.columnDividerSibilings.rightSideColumnPosition,
					title: columnTitle,
				},
				sourceSlide,
			}));
		});
	}

	private addColumnBetweenExistingColumnsByLibrarySlide(sourceSlideId: number): void {
		this.presentationCreatorComponentFactoryService.createColumnTitleComponent().columnTitle$.pipe(
			first(),
			withLatestFrom(this.store.pipe(select(selectSlideFromLibraryById, { slideId: sourceSlideId }))),
		).subscribe(([ columnTitle, sourceSlide ]: [ string, Slide ]) => {
			this.store.dispatch(new AddColumnBetweenExistingColumnsByLibrarySlide({
				column: {
					id: Math.floor((Math.random() * 10000000) + 1),
					position: this.columnDividerSibilings.rightSideColumnPosition,
					title: columnTitle,
				},
				sourceSlide: {
					...sourceSlide,
					id: Math.floor((Math.random() * 10000000) + 1),
				},
			}));
		});
	}
}
