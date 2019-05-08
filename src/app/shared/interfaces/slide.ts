import { SlidePosition } from 'src/app/shared/interfaces/slide-position';
import { SlideActionParams } from 'src/app/shared/interfaces/slide-action-params';

export interface ISlide {
	id: number;
	presentationId: number | null;
	columnId: number | null;
	position: SlidePosition;
	imageData: string | ArrayBuffer;
	actions: SlideActionParams[];
}

export type Slide = Readonly<ISlide>;
