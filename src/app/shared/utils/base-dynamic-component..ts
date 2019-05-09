import { EventEmitter } from '@angular/core';

export abstract class BaseDynamicComponent {
	public readonly onSaveAction: EventEmitter<number | string | boolean> = new EventEmitter();
	public readonly onCancelAction: EventEmitter<void | boolean> = new EventEmitter();

	public onSave(event?: MouseEvent): void {
	}

	public onCancel(event?: MouseEvent): void {
	}
}
