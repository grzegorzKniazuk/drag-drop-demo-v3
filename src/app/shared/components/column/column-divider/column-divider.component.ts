import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
	selector: 'app-column-divider',
	templateUrl: './column-divider.component.html',
	styleUrls: [ './column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDividerComponent extends DropZoneBase implements OnInit {

	constructor(
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;
	}
}
