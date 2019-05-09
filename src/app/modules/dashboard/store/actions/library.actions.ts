import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces';

export enum LibraryActionsTypes {
	ADD_SLIDES = '[Library] Add Slides',
	REMOVE_SLIDE = '[Library] Remove Slide',
}

export class ADD_SLIDES implements Action {
	public readonly type = LibraryActionsTypes.ADD_SLIDES;

	constructor(public payload: { slides: Slide[] }) {
	}
}

export class REMOVE_SLIDE implements Action {
	public readonly type = LibraryActionsTypes.REMOVE_SLIDE;

	constructor(public payload: { slideId: number }) {
	}
}

export type LibraryActions = ADD_SLIDES | REMOVE_SLIDE;
