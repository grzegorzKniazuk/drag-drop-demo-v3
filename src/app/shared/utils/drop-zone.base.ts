export abstract class DropZoneBase {
	public isElementOnDragOver: boolean;

	public allowDrop(event: DragEvent): void {
		event.preventDefault();

		this.isElementOnDragOver = true;
	}

	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}

	public get dragOverCssClass(): string {
		return this.isElementOnDragOver ? 'drag-over' : '';
	}
}
