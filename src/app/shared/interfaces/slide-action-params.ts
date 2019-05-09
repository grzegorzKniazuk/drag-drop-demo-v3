import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { Style } from 'src/app/shared/interfaces';

export interface SlideActionParams {
	id: number;
	type: SlideActionTypes;
	target: number | string;
	style: Style;
}
