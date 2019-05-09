import { Action } from '@ngrx/store';
import { Column, Presentation, Slide } from 'src/app/shared/interfaces';

export enum PresentationListActionsTypes {
	SAVE_PRESENTATION = '[List] Save Presentation',
	UPDATE_PRESENTATION = '[List] Update Presentation',
	REMOVE_PRESENTATION = '[List] Remove Presentation',
}

export class SAVE_PRESENTATION implements Action {
	public readonly type = PresentationListActionsTypes.SAVE_PRESENTATION;

	constructor(public payload: { presentation: Presentation }) {
	}
}

export class UPDATE_PRESENTATION implements Action {
	public readonly type = PresentationListActionsTypes.UPDATE_PRESENTATION;

	constructor(public payload: { id: number, title: string, slides: Slide[], columns: Column[] }) {
	}
}

export class REMOVE_PRESENTATION implements Action {
	public readonly type = PresentationListActionsTypes.REMOVE_PRESENTATION;

	constructor(public payload: { presentationId: number }) {
	}
}

export type PresentationListActions = SAVE_PRESENTATION | UPDATE_PRESENTATION | REMOVE_PRESENTATION;
