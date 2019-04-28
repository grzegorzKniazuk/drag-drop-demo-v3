import { NgZone } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { first, withLatestFrom } from 'rxjs/operators';
import { selectAmountOfSlidesInColumnById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { Slide } from 'src/app/shared/interfaces/slide';
import { AddSlideFromLibraryToExistingColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AppState } from 'src/app/store';

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

	public allowDrop(event: DragEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.isElementOnDragOver = true;
		});
	}

	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}

	protected moveSlideFromLibraryToColumn(sourceSlideId: number, targetColumnId): void {
		this.store.pipe(
			select(selectSlideFromLibraryById, { slideId: sourceSlideId }),
			withLatestFrom(this.store.pipe(select(selectAmountOfSlidesInColumnById, { columnId: targetColumnId }))),
			first(),
		).subscribe(([ slideToMove, amountOfSlidesInExsistingColumn ]: [ Slide, number ]) => {
			this.store.dispatch(new AddSlideFromLibraryToExistingColumn({
				sourceSlide: slideToMove,
				targetColumnId: targetColumnId,
				targetSlidePosition: amountOfSlidesInExsistingColumn,
			}));
		});
	}
}
