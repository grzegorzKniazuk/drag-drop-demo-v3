import { SlidePosition } from 'src/app/shared/interfaces/slide-position';
import { SlideActionParams } from 'src/app/shared/interfaces/slide-action-params';

export interface ISlide {
	id: number;
	presentationId: number;
	columnId: number;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
	readonly actions: SlideActionParams[];
}

export type Slide = Readonly<ISlide>;
