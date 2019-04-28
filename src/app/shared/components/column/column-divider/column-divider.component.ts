import { ChangeDetectionStrategy, Component, Input, NgZone, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ColumnDividerSibilings } from 'src/app/shared/interfaces/column-divider-sibilings';

@Component({
	selector: 'app-column-divider',
	templateUrl: './column-divider.component.html',
	styleUrls: [ './column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDividerComponent extends DropZoneBase implements OnInit {

	@Input() columnDividerSibilings: ColumnDividerSibilings;

	constructor(
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		console.log(this.columnDividerSibilings);
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;
	}
}
