import { HostListener, NgZone } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { first, withLatestFrom } from 'rxjs/operators';
import { selectAmountOfSlidesInColumnById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { Slide } from 'src/app/shared/interfaces/slide';
import { AddSlideFromLibraryToExistingColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AppState } from 'src/app/store';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { Memoize } from 'lodash-decorators';

export abstract class DropZoneBase {
	public isElementOnDragOver: boolean;

	protected constructor(
		protected store: Store<AppState>,
		protected ngZone: NgZone,
	) {
	}

	public get dragOverCssClass(): string {
		return this.isElementOnDragOver ? 'drag-over' : '';
	}

	@HostListener('dragover', [ '$event' ])
	public allowDrop(event: DragEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.isElementOnDragOver = true;
		});
	}

	@HostListener('dragleave', [ '$event' ])
	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}

	protected moveSlideFromLibraryToColumn(sourceSlideId: number, targetColumnId): void {
		this.store.pipe(
			select(selectSlideFromLibraryById, { slideId: sourceSlideId }),
			first(),
			withLatestFrom(this.store.pipe(select(selectAmountOfSlidesInColumnById, { columnId: targetColumnId }))),
		).subscribe(([ slideToMove, amountOfSlidesInExsistingColumn ]: [ Slide, number ]) => {
			this.store.dispatch(new AddSlideFromLibraryToExistingColumn({
				sourceSlide: slideToMove,
				targetColumnId: targetColumnId,
				targetSlidePosition: amountOfSlidesInExsistingColumn,
			}));
		});
	}

	@Memoize
	protected parseDataTransferFromDropEvent(event: DragEvent): SlideDataTransfer {
		return JSON.parse(event.dataTransfer.getData('string'));
	}
}
