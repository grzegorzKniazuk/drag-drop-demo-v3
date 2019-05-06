import { SlidePosition } from 'src/app/shared/interfaces/slide-position';

export interface ISlide {
	id: number;
	columnId: number | null;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
}

export type Slide = Readonly<ISlide>;
