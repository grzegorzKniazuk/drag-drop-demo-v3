import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-presentation-list',
	templateUrl: './presentation-list.component.html',
	styleUrls: [ './presentation-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationListComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
