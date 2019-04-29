import { ChangeDetectionStrategy, Component, HostListener, Input, NgZone } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { SlideDividerSibilings } from 'src/app/shared/interfaces/slide-divider-sibilings';
import { isNull, isNumber } from 'lodash';
import {
	AddSlideToPresentation,
	MoveBetweenSlidesInTheDifferentColumn,
	MoveBetweenSlidesInTheSameColumn,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { first } from 'rxjs/operators';
import { Slide } from 'src/app/shared/interfaces/slide';

@Component({
	selector: 'app-slide-column-divider',
	templateUrl: './slide-column-divider.component.html',
	styleUrls: [ './slide-column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideColumnDividerComponent extends DropZoneBase {

	@Input() public slideDividerSibilings: SlideDividerSibilings;
	@Input() public numberOfSlidesInColumn: number;
	@Input() public columnId: number;

	constructor(
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	@HostListener('drop', ['$event'])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceColumnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		if (sourceColumnId === this.columnId) { // drag n drop w tej samej kolumnie
			this.moveBetweenSlidesInTheSameColumn(sourceSlideId);
		} else if (sourceColumnId !== this.columnId && isNumber(sourceColumnId)) { // drag n drop z innej kolumny
			this.moveBetweenSlidesInTheDifferentColumn(sourceSlideId);
		} else if (isNull(sourceColumnId)) { // drag n drop z biblioteki
			this.addSlideToPresentation(sourceSlideId);
		}
	}

	private addSlideToPresentation(sourceSlideId: number): void {
		this.store.pipe(
			select(selectSlideFromLibraryById, { slideId: sourceSlideId }),
			first(),
		).subscribe((sourceSlide: Slide) => {
			this.store.dispatch(new AddSlideToPresentation({
				slide: {
					...sourceSlide,
					columnId: this.columnId,
					position: this.slideDividerSibilings.bottomSlidePosition,
				},
			}));
		});
	}

	private moveBetweenSlidesInTheSameColumn(sourceSlideId: number): void {
		this.store.dispatch(new MoveBetweenSlidesInTheSameColumn({
			slide: {
				id: sourceSlideId,
				changes: {
					position: this.slideDividerSibilings.bottomSlidePosition,
				},
			},
		}));
	}

	private moveBetweenSlidesInTheDifferentColumn(sourceSlideId: number): void {
		this.store.dispatch(new MoveBetweenSlidesInTheDifferentColumn({
			slide: {
				id: sourceSlideId,
				changes: {
					columnId: this.columnId,
					position: this.slideDividerSibilings.bottomSlidePosition,
				},
			},
		}));
	}
}
