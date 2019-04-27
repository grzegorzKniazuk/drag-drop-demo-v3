import { ChangeDetectionStrategy, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UpdateSlidePositionInColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';

@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnInit, OnChanges {

	@Input() public slide: Slide;
	@Input() public position: number;

	constructor(
		private store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(ngZone);
	}

	ngOnInit() {
		console.log('init');
		this.initSLidePositionInColumn();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.updateSlidePositionInColumn(changes);
	}

	private initSLidePositionInColumn(): void {
		this.store.dispatch(new UpdateSlidePositionInColumn({
			slide: {
				id: this.slide.id,
				changes: {
					position: this.position,
				},
			},
		}));
	}

	private updateSlidePositionInColumn(changes: SimpleChanges): void {
		if (changes.position && changes.position.currentValue !== this.slide.position) {
			this.ngZone.runOutsideAngular(() => {
				this.store.dispatch(new UpdateSlidePositionInColumn({
					slide: {
						id: this.slide.id,
						changes: {
							position: changes.position.currentValue,
						},
					},
				}));
			});
		}
	}

	public onDragStart(event: DragEvent): void {
		event.stopImmediatePropagation();

		console.log(this.slide.id);

		event.dataTransfer.setData('string', JSON.stringify({
			sourceSlideId: this.slide.id,
			sourceColumnId: this.slide.columnId,
		}));
	}
}
