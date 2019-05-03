import { Action } from '@ngrx/store';
import { Presentation } from 'src/app/shared/interfaces/presentation';

export enum PresentationListActionsTypes {
	SavePresentation = '[List] Save Presentation',
	RemovePresentation = '[List] Remove Presentation',
}

export class SavePresentation implements Action {
	public readonly type = PresentationListActionsTypes.SavePresentation;

	constructor(public payload: { presentation: Presentation }) {
	}
}

export class RemovePresentation implements Action {
	public readonly type = PresentationListActionsTypes.RemovePresentation;

	constructor(public payload: { presentationId: number }) {
	}
}

export type PresentationListActions = SavePresentation | RemovePresentation;
