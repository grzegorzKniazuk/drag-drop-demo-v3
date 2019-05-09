import { HostListener, NgZone } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { combineLatest } from 'rxjs';
import { selectAmountOfSlidesInColumnById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { Slide, SlideDataTransfer } from 'src/app/shared/interfaces';
import { AddSlideFromLibraryToExistingColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AppState } from 'src/app/store';
import { selectColumnPositionById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/column.selectors';
import { first } from 'rxjs/operators';

export abstract class DropZoneBase {
	public isElementOnDragOver: boolean;
	public isElementOnMouseEnter: boolean;

	protected constructor(
		protected store: Store<AppState>,
		protected ngZone: NgZone,
	) {
	}

	public get dragOverCssClass(): string {
		return this.isElementOnDragOver ? 'drag-over' : '';
	}

	protected get generateSlideId(): number {
		return Math.floor((Math.random() * 10000000) + 1);
	}

	protected get generateColumnId(): number {
		return Math.floor((Math.random() * 10000000) + 1);
	}

	@HostListener('dragover', [ '$event' ])
	public allowDrop(event: DragEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.isElementOnDragOver = true;
		});
	}

	@HostListener('dragleave')
	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}

	@HostListener('mouseenter')
	public onMouseEnter(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = true;
		});
	}

	@HostListener('mouseleave')
	public onMouseLeave(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = false;
		});
	}

	protected moveSlideFromLibraryToColumn(sourceSlideId: number, targetColumnId): void {
		combineLatest(
			this.store.pipe(select(selectSlideFromLibraryById, { slideId: sourceSlideId })),
			this.store.pipe(select(selectColumnPositionById, { columnId: targetColumnId })),
			this.store.pipe(select(selectAmountOfSlidesInColumnById, { columnId: targetColumnId })),
		)
		.pipe(
			first(),
		)
		.subscribe(([ slideToMove, columnPosition, amountOfSlidesInExsistingColumn ]: [ Slide, number, number ]) => {
			this.store.dispatch(new AddSlideFromLibraryToExistingColumn({
				sourceSlide: {
					...slideToMove,
					id: Math.floor((Math.random() * 10000000) + 1),
					columnId: targetColumnId,
					position: {
						column: columnPosition,
						order: amountOfSlidesInExsistingColumn,
					},
				},
			}));
		});
	}

	protected parseDataTransferFromDropEvent(event: DragEvent): SlideDataTransfer {
		return JSON.parse(event.dataTransfer.getData('string'));
	}
}
