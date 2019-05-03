import { Action } from '@ngrx/store';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Column } from 'src/app/shared/interfaces/column';

export enum PresentationListActionsTypes {
	SavePresentation = '[List] Save Presentation',
	UpdatePresentation = '[List] Update Presentation',
	RemovePresentation = '[List] Remove Presentation',
}

export class SavePresentation implements Action {
	public readonly type = PresentationListActionsTypes.SavePresentation;

	constructor(public payload: { presentation: Presentation }) {
	}
}

export class UpdatePresentation implements Action {
	public readonly type = PresentationListActionsTypes.UpdatePresentation;

	constructor(public payload: { id: number, title: string, slides: Slide[], columns: Column[] }) {
	}
}

export class RemovePresentation implements Action {
	public readonly type = PresentationListActionsTypes.RemovePresentation;

	constructor(public payload: { presentationId: number }) {
	}
}

export type PresentationListActions = SavePresentation | UpdatePresentation | RemovePresentation;
