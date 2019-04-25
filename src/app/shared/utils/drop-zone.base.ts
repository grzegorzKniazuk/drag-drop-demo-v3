export abstract class DropZoneBase {
	public allowDrop(event: DragEvent): void {
		event.preventDefault();
	}
}
