import { NgZone } from '@angular/core';

export abstract class DropZoneBase {

	protected constructor(
		protected ngZone: NgZone,
	) {
	}

	public isElementOnDragOver: boolean;

	public get dragOverCssClass(): string {
		return this.isElementOnDragOver ? 'drag-over' : '';
	}

	public allowDrop(event: DragEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.isElementOnDragOver = true;
		});
	}

	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}
}
