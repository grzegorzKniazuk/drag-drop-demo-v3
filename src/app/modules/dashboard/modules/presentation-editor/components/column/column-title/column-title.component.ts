import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@Component({
	selector: 'app-column-title',
	templateUrl: './column-title.component.html',
	styleUrls: [ './column-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleComponent extends BaseDynamicComponent {

	public columnTitle: string;
	public dialogVisibility = true;

	@HostListener('document:keydown.enter')
	public onSave(): void {
		this.dialogVisibility = false;
		this.onSaveAction.emit(this.columnTitle);
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.dialogVisibility = false;
		this.onCancelAction.emit();
	}
}
