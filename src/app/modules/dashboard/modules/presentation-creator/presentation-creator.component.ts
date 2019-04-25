import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';

@Component({
	selector: 'app-presentation-creator',
	templateUrl: './presentation-creator.component.html',
	styleUrls: [ './presentation-creator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent extends DropZoneBase implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {
	}

}
