export interface Slide {
	id: number;
	position: number | null;
	columnId: number | null;
	imageData: string | ArrayBuffer;
}
