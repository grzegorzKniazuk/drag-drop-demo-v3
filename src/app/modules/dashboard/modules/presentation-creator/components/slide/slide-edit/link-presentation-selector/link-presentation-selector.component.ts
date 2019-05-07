import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-link-presentation-selector',
	templateUrl: './link-presentation-selector.component.html',
	styleUrls: [ './link-presentation-selector.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPresentationSelectorComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
