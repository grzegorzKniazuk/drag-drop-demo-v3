import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';

@Component({
	selector: 'app-slide-column-divider',
	templateUrl: './slide-column-divider.component.html',
	styleUrls: [ './slide-column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideColumnDividerComponent extends DropZoneBase implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {
	}

}
