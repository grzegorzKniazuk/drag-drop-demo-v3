import { SlidePosition } from 'src/app/shared/interfaces';

export interface SlideDataTransfer {
	sourceSlideId: number;
	sourceColumnId: number;
	sourceSlidePosition: SlidePosition;
}
