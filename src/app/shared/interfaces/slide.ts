import { SlideActionParams, SlidePosition } from 'src/app/shared/interfaces';

export interface ISlide {
	id: number;
	presentationId: number;
	columnId: number;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
	readonly actions: SlideActionParams[];
}

export type Slide = Readonly<ISlide>;
