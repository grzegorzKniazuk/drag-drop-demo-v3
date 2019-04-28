import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-slide-column-divider',
	templateUrl: './slide-column-divider.component.html',
	styleUrls: [ './slide-column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideColumnDividerComponent extends DropZoneBase implements OnInit {

	constructor(
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
	}

}
