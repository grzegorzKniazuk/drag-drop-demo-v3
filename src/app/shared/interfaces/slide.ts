import { SlidePosition } from 'src/app/shared/interfaces/slide-position';

export interface Slide {
	id: number;
	columnId: number | null;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
}
