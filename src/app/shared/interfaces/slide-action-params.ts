import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';

export interface SlideActionParams {
	id: number;
	type: SlideActionTypes;
	target: number | string;
	style: {
		[key: string]: string;
	};
}
