import { SlidePosition } from 'src/app/shared/interfaces/slide-position';

export interface ISlide {
	id: number;
	presentationId: number | null;
	columnId: number | null;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
}

export type Slide = Readonly<ISlide>;
