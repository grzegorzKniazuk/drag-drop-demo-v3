import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum LibraryActionsTypes {
	AddElements = '[Library] Add Elements',
}

export class AddElements implements Action {
	public readonly type = LibraryActionsTypes.AddElements;

	constructor(public payload: { slides: Slide[] }) {
	}
}

export type LibraryActions = AddElements;
