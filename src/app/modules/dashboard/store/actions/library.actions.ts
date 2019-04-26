import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum LibraryActionsTypes {
	AddSlidesToLibrary = '[Library] Add Elements',
}

export class AddSlidesToLibrary implements Action {
	public readonly type = LibraryActionsTypes.AddSlidesToLibrary;

	constructor(public payload: { slides: Slide[] }) {
	}
}

export type LibraryActions = AddSlidesToLibrary;
