import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-slide-action-form',
	templateUrl: './slide-action-form.component.html',
	styleUrls: [ './slide-action-form.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideActionFormComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
