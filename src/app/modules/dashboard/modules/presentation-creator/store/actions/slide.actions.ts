import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlide = '[Slide] Add Slide',
	MoveSlide = '[Slide] Move Slide',
	UpdateSlide = '[Slide] Update Slide',
}

export class AddSlide implements Action {
	public readonly type = SlideActionsTypes.AddSlide;

	constructor(public payload: { slide: Slide }) {
	}
}

export class MoveSlide implements Action {
	public readonly type = SlideActionsTypes.MoveSlide;

	constructor(public payload: { slidesIds: number[], sourceColumnId: number, targetColumnId: number }) {
	}
}

export class UpdateSlide implements Action {
	public readonly type = SlideActionsTypes.UpdateSlide;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export type SlideActions = AddSlide | MoveSlide | UpdateSlide;
