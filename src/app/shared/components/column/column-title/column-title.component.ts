import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';

@Component({
	selector: 'app-column-title',
	templateUrl: './column-title.component.html',
	styleUrls: [ './column-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleComponent {

	@ViewChild('titleInput') private titleInput: ElementRef;
	public columnTitle$: EventEmitter<string> = new EventEmitter<string>();
	public columnTitle: string;
	public dialogVisibility = true;

	public onSave(): void {
		this.dialogVisibility = false;
		this.columnTitle$.emit(this.columnTitle);
	}

	public onCancel(): void {
		this.dialogVisibility = false;
	}
}
