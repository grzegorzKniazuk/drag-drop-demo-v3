import { SlideCoordinates } from 'src/app/shared/interfaces/slide-coordinates';

export interface Slide {
	id: number;
	columnId: number | null;
	position: number | null;
	coordinates: SlideCoordinates;
	imageData: string | ArrayBuffer;
}
