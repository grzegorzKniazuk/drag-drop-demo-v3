import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';

@Component({
	selector: 'app-slide-link-thumbnail',
	templateUrl: './slide-link-thumbnail.component.html',
	styleUrls: [ './slide-link-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLinkThumbnailComponent implements OnInit {

	@Input() public slide: Slide;

	constructor() {
	}

	ngOnInit() {
	}

}
