import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlideToPresentation = '[Slide] Add Slide In Presentation',
	UpdateSlidePositionInColumn = '[Slide] Update Slide Position In Column',
	UpdateSlideInPresentation = '[Slide] Update Slide In Presentation',
}

export class AddSlideToPresentation implements Action {
	public readonly type = SlideActionsTypes.AddSlideToPresentation;

	constructor(public payload: { slide: Slide }) {
	}
}

export class UpdateSlidePositionInColumn implements Action {
	public readonly type = SlideActionsTypes.UpdateSlidePositionInColumn;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class UpdateSlideInPresentation implements Action {
	public readonly type = SlideActionsTypes.UpdateSlideInPresentation;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export type SlideActions = AddSlideToPresentation | UpdateSlidePositionInColumn | UpdateSlideInPresentation;
