import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-slide-action-edit-form',
	templateUrl: './slide-action-edit-form.component.html',
	styleUrls: [ './slide-action-edit-form.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideActionEditFormComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
