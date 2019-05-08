import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';

export interface SlideLinkActionParams {
	id: number;
	type: SlideActionTypes;
	style: {
		[key: string]: string;
	};
}
