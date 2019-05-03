import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Presentation } from '../../../../../../shared/interfaces/presentation';

@Component({
	selector: 'app-presentation-thumbnail',
	templateUrl: './presentation-thumbnail.component.html',
	styleUrls: [ './presentation-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent implements OnInit {

	@Input() presentation: Presentation;

	constructor() {
	}

	ngOnInit() {
	}

}
