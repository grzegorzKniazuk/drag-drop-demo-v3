import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlideToPresentation = '[Slide] Add Slide In Presentation',
	MoveSlideToNewCreatedColumn = '[Slide] Move Slide To New Created Column',
	MoveSlideBetweenColumns = '[Slide] Move Slide Between Columns',
	UpdateSlidePosition = '[Slide] Update Slide Position',
	SwapSlideInTheSameColumn = '[Slide] Swap Slide In The Same Column',
	SwapSlideInTheDifferentColumns = '[Slide] Swap Slide In The Different Column',
	MoveBetweenSlidesInTheSameColumn = '[Slide] Move Between Slides In The Same Column',
	MoveBetweenSlidesInTheDifferentColumn = '[Slide] Move Between Slides In The Different Column',
	RemoveSlide = '[Slide] Remove Slide',
}

export class AddSlideToPresentation implements Action {
	public readonly type = SlideActionsTypes.AddSlideToPresentation;

	constructor(public payload: { slide: Slide }) {
	}
}

export class MoveSlideToNewCreatedColumn implements Action {
	public readonly type = SlideActionsTypes.MoveSlideToNewCreatedColumn;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class MoveSlideBetweenColumns implements Action {
	public readonly type = SlideActionsTypes.MoveSlideBetweenColumns;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class UpdateSlidePosition implements Action {
	public readonly type = SlideActionsTypes.UpdateSlidePosition;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class SwapSlideInTheSameColumn implements Action {
	public readonly type = SlideActionsTypes.SwapSlideInTheSameColumn;

	constructor(public payload: { slides: Update<Slide>[] }) {
	}
}

export class SwapSlideInTheDifferentColumns implements Action {
	public readonly type = SlideActionsTypes.SwapSlideInTheDifferentColumns;

	constructor(public payload: { slides: Update<Slide>[] }) {
	}
}

export class MoveBetweenSlidesInTheSameColumn implements Action {
	public readonly type = SlideActionsTypes.MoveBetweenSlidesInTheSameColumn;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class MoveBetweenSlidesInTheDifferentColumn implements Action {
	public readonly type = SlideActionsTypes.MoveBetweenSlidesInTheDifferentColumn;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export class RemoveSlide implements Action {
	public readonly type = SlideActionsTypes.RemoveSlide;

	constructor(public payload: { slideId: number }) {
	}
}

export type SlideActions =
	AddSlideToPresentation
	| MoveSlideToNewCreatedColumn
	| MoveSlideBetweenColumns
	| UpdateSlidePosition
	| SwapSlideInTheSameColumn
	| SwapSlideInTheDifferentColumns
	| MoveBetweenSlidesInTheSameColumn
	| MoveBetweenSlidesInTheDifferentColumn
	| RemoveSlide;
