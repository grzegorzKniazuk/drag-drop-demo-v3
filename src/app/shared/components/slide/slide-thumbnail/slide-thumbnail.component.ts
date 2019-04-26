import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';

@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnInit {

	@Input() public slide: Slide;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	public onDragStart(event: DragEvent): void {
		event.stopImmediatePropagation();

		event.dataTransfer.setData('string', JSON.stringify({
			sourceSlideId: this.slide.id,
			sourceColumnId: this.slide.columnId,
		}));
	}
}
