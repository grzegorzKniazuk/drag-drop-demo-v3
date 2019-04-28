import { ChangeDetectionStrategy, Component, Input, NgZone, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnInit {

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
		console.log(this.position);
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
