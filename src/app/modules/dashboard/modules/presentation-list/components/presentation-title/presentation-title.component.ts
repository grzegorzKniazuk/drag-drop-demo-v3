import { ChangeDetectionStrategy, Component, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'app-presentation-title',
	templateUrl: './presentation-title.component.html',
	styleUrls: [ './presentation-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationTitleComponent {

	public presentationTitle$: EventEmitter<string> = new EventEmitter<string>();
	public presentationTitle: string;
	public dialogVisibility = true;

	@HostListener('document:keydown.enter')
	public onSave(): void {
		if (this.presentationTitle && this.presentationTitle.length) {
			this.presentationTitle$.emit(this.presentationTitle);
			this.dialogVisibility = false;
		}
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.dialogVisibility = false;
	}
}
