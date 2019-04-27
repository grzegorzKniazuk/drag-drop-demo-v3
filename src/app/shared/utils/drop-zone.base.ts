export abstract class DropZoneBase {
	public isElementOnDragOver: boolean;

	public get dragOverCssClass(): string {
		return this.isElementOnDragOver ? 'drag-over' : '';
	}

	public allowDrop(event: DragEvent): void {
		event.preventDefault();

		this.isElementOnDragOver = true;
	}

	public onDragLeave(): void {
		this.isElementOnDragOver = false;
	}
}
