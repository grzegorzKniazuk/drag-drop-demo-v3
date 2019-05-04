import { SlidePosition } from 'src/app/shared/interfaces/slide-position';

export interface SlideDataTransfer {
	sourceSlideId: number;
	sourceColumnId: number;
	sourceSlidePosition: SlidePosition;
}
