import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-link-slide-selector',
	templateUrl: './link-slide-selector.component.html',
	styleUrls: [ './link-slide-selector.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSlideSelectorComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
