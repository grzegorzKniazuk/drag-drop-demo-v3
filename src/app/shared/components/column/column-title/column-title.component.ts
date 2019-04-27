import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-column-title',
	templateUrl: './column-title.component.html',
	styleUrls: [ './column-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleComponent implements AfterViewInit {

	@ViewChild('titleInput') private titleInput: ElementRef;
	public columnTitle$: EventEmitter<string> = new EventEmitter<string>();
	public columnTitle: string;
	public dialogVisibility = true;

	ngAfterViewInit() {
		this.titleInput.nativeElement.focus();
	}

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
