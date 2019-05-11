import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { Coordinates, ElementSize, Style } from 'src/app/shared/interfaces';

export interface SlideActionParams {
	id: number;
	type: SlideActionTypes;
	target: number | string;
	position: Coordinates;
	size: ElementSize;
	style: Style;
}
