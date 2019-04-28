import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UpdateSlideColumnPosition } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnChanges, OnDestroy {

	@Input() public slide: Slide;
	@Input() public position: number;

	constructor(
		private store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(ngZone);
	}

	ngOnChanges(changes: SimpleChanges) {
		/*
		this.store.pipe(
			select(selectSlidePositionById, { slideId: this.slide.id }),
			first(),
		).subscribe((slidePositionFromStore: number) => {
			console.log(`slidePositionFromStore: ${slidePositionFromStore} this.position: ${this.position}`);
			if (slidePositionFromStore !== this.position) {
				this.store.dispatch(new UpdateSlideColumnPosition({
					slide: {
						id: this.slide.id,
						changes: {
							position: this.position,
						},
					},
				}));
			}
		});
		*/
		console.log(`slidePositionFromStore: ${this.slide.position} this.position: ${this.position}`);
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

	public onDragStart(event: DragEvent): void {
		event.stopImmediatePropagation();

		event.dataTransfer.setData('string', JSON.stringify({
			sourceSlideId: this.slide.id,
			sourceColumnId: this.slide.columnId,
		}));
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();
	}
}
