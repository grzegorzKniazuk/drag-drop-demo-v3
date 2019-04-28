import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UpdateSlideColumnPosition } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { interval } from 'rxjs';

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
		private store: Store<AppState>,
		private changeDetectorRef: ChangeDetectorRef,
		ngZone: NgZone,
	) {
		super(ngZone);
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
			sourceColumnId: this.slide.columnId,
		}));
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();
	}
}
