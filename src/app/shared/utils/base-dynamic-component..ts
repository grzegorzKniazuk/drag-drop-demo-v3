import { EventEmitter } from '@angular/core';

export abstract class BaseDynamicComponent {
	public onSaveAction: EventEmitter<number | string | boolean> = new EventEmitter();
	public onCancelAction: EventEmitter<void | boolean> = new EventEmitter();

	public onSave(event?: MouseEvent): void {
	}

	public onCancel(event?: MouseEvent): void {
	}
}
