import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: [ './column.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends DropZoneBase implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {
	}

	public onDrop(event: DragEvent): void {

	}

}
