import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
	SwapSlideInTheDifferentColumns,
	SwapSlideInTheSameColumn,
	UpdateSlideColumnPosition,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { interval } from 'rxjs';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { Update } from '@ngrx/entity';
import { isNumber, isNull } from 'lodash';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnInit, OnChanges, OnDestroy {

	@Input() public slide: Slide;
	@Input() public position: number;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		this.detectPositionChangesOnSlideMove();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.slide.position !== this.position) {
			this.store.dispatch(new UpdateSlideColumnPosition({
				slide: {
					id: this.slide.id,
					changes: {
						position: this.position,
					},
				},
			}));
		}
	}

	ngOnDestroy() {
	}

	private detectPositionChangesOnSlideMove(): void {
		interval(500).subscribe(() => {
			this.changeDetectorRef.markForCheck();
		});
	}

	public onDragStart(event: DragEvent): void {
		event.stopImmediatePropagation();

		event.dataTransfer.setData('string', JSON.stringify({
			sourceSlideId: this.slide.id,
			sourceSlidePosition: this.slide.position,
			sourceColumnId: this.slide.columnId,
		}));
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceSlidePosition, sourceColumnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		if (sourceColumnId === this.slide.columnId && isNumber(sourceSlidePosition)) {
			this.swapSlideInTheSameColumn(sourceSlideId, sourceSlidePosition);
		} else if (sourceColumnId !== this.slide.columnId && isNumber(sourceSlidePosition)) {
			this.swapSlideInTheDifferentColumns(sourceSlideId, sourceColumnId, sourceSlidePosition);
		} else if (isNull(sourceSlidePosition)) {
			this.moveSlideFromLibraryToColumn(sourceSlideId, this.slide.columnId); // jesli slajd przenoszony z bibloteki do dodaj go na dół kolumny
		}
	}

	private swapSlideInTheSameColumn(sourceSlideId: number, sourceSlidePosition: number): void {
		const sourceSlide: Update<Slide> = {
			id: sourceSlideId,
			changes: {
				position: this.position,
			},
		};

		const targetSlide: Update<Slide> = {
			id: this.slide.id,
			changes: {
				position: sourceSlidePosition,
			},
		};

		this.store.dispatch(new SwapSlideInTheSameColumn({
			slides: [ sourceSlide, targetSlide ],
		}));
	}

	private swapSlideInTheDifferentColumns(sourceSlideId: number, sourceColumnId: number, sourceSlidePosition: number): void {
		const sourceSlide: Update<Slide> = {
			id: sourceSlideId,
			changes: {
				columnId: this.slide.columnId,
				position: this.position,
			},
		};

		const targetSlide: Update<Slide> = {
			id: this.slide.id,
			changes: {
				columnId: sourceColumnId,
				position: sourceSlidePosition,
			},
		};

		this.store.dispatch(new SwapSlideInTheDifferentColumns({
			slides: [ sourceSlide, targetSlide ],
		}));
	}
}
