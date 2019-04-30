import { ChangeDetectionStrategy, Component, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'app-column-title',
	templateUrl: './column-title.component.html',
	styleUrls: [ './column-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleComponent {

	public columnTitle$: EventEmitter<string> = new EventEmitter<string>();
	public columnTitle: string;
	public dialogVisibility = true;

	@HostListener('document:keydown.enter')
	public onSave(): void {
		this.dialogVisibility = false;
		this.columnTitle$.emit(this.columnTitle);
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.dialogVisibility = false;
	}
}
