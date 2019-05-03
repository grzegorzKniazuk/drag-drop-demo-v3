import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-presentation-thumbnail',
	templateUrl: './presentation-thumbnail.component.html',
	styleUrls: [ './presentation-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
