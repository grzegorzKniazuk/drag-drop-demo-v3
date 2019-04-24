import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';

export enum SlideActionsTypes {
	AddSlide = '[Slide] Add Slide',
}

export class AddSlide implements Action {
	public readonly type = SlideActionsTypes.AddSlide;

	constructor(public payload: { slide: Slide }) {}
}

export type SlideActions = AddSlide;
