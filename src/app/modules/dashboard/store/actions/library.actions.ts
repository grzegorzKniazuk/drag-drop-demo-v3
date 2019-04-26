import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum LibraryActionsTypes {
	AddSlidesToLibrary = '[Library] Add Elements',
	MoveSlideFromLibrary = '[Slide] Move Slide From Library',
}

export class AddSlidesToLibrary implements Action {
	public readonly type = LibraryActionsTypes.AddSlidesToLibrary;

	constructor(public payload: { slides: Slide[] }) {
	}
}

export class MoveSlideFromLibrary implements Action {
	public readonly type = LibraryActionsTypes.MoveSlideFromLibrary;

	constructor(public payload: { slideId: number, targetColumnId: number }) {
	}
}

export type LibraryActions = AddSlidesToLibrary | MoveSlideFromLibrary;
