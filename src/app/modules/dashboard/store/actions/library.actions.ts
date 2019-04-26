import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum LibraryActionsTypes {
	AddSlidesToLibrary = '[Library] Add Elements',
	RemoveSlideFromLibrary = '[Slide] Remove Slide From Library',
}

export class AddSlidesToLibrary implements Action {
	public readonly type = LibraryActionsTypes.AddSlidesToLibrary;

	constructor(public payload: { slides: Slide[] }) {
	}
}

export class RemoveSlideFromLibrary implements Action {
	public readonly type = LibraryActionsTypes.RemoveSlideFromLibrary;

	constructor(public payload: { sourceSlideId: number }) {
	}
}

export type LibraryActions = AddSlidesToLibrary | RemoveSlideFromLibrary;
