import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-library-bar',
	templateUrl: './library-bar.component.html',
	styleUrls: [ './library-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryBarComponent implements OnInit {

	public display: boolean;

	constructor() {
	}

	ngOnInit() {
	}

}
