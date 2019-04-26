import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Column } from 'src/app/shared/interfaces/column';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: [ './column.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends DropZoneBase implements OnInit {

	@Input() public column: Column;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	public onDrop(event: DragEvent): void {

	}

}
