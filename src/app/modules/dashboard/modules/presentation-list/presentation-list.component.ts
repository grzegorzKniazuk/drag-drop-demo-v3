import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-presentation-list',
	templateUrl: './presentation-list.component.html',
	styleUrls: [ './presentation-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationListComponent implements OnInit {

	constructor(
		private title: Title,
	) {
	}

	ngOnInit() {
		this.title.setTitle('Lista prezentacji');
	}

}
