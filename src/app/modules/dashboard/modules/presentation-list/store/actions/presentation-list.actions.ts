import { Action } from '@ngrx/store';
import { Presentation } from 'src/app/shared/interfaces/presentation';

export enum PresentationListActionsTypes {
	SavePresentation = '[List] Save Presentation',
}

export class SavePresentation implements Action {
	public readonly type = PresentationListActionsTypes.SavePresentation;

	constructor(public payload: { presentation: Presentation }) {
	}
}

export type PresentationListActions = SavePresentation;
