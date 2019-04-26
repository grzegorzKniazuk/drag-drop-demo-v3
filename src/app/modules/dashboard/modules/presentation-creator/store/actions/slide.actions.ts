import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlideToPresentation = '[Slide] Add Slide In Presentation',
	MoveSlideInPresentation = '[Slide] Move Slide In Presentation',
	UpdateSlideInPresentation = '[Slide] Update Slide In Presentation',
}

export class AddSlideToPresentation implements Action {
	public readonly type = SlideActionsTypes.AddSlideToPresentation;

	constructor(public payload: { slide: Slide }) {
	}
}

export class MoveSlideInPresentation implements Action {
	public readonly type = SlideActionsTypes.MoveSlideInPresentation;

	constructor(public payload: { slidesIds: number[], sourceColumnId: number, targetColumnId: number }) {
	}
}

export class UpdateSlideInPresentation implements Action {
	public readonly type = SlideActionsTypes.UpdateSlideInPresentation;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export type SlideActions = AddSlideToPresentation | MoveSlideInPresentation | UpdateSlideInPresentation;
