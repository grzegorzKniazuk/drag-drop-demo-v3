import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlideToPresentation = '[Slide] Add Slide In Presentation',
	AddSlides = '[Slide] Add Slides',
	MoveSlideToNewCreatedColumn = '[Slide] Move Slide To New Created Column',
	MoveSlideBetweenColumns = '[Slide] Move Slide Between Columns',
	UpdateSlidePosition = '[Slide] Update Slide Position',
	SwapSlideInTheSameColumn = '[Slide] Swap Slide In The Same Column',
	SwapSlideInTheDifferentColumns = '[Slide] Swap Slide In The Different Column',
	MoveBetweenSlidesInTheSameColumn = '[Slide] Move Between Slides In The Same Column',
	MoveBetweenSlidesInTheDifferentColumn = '[Slide] Move Between Slides In The Different Column',
	RemoveSlide = '[Slide] Remove Slide',
	RemoveSlidesByColumn = '[Slide] Remove Slides By Column',
	ClearSlides = '[Slide] Clear Slides',
	UpdateSlideActions = '[Slide] Update Slide Actions',
}

export class AddSlideToPresentation implements Action {
	public readonly type = SlideActionsTypes.AddSlideToPresentation;

	constructor(public payload: { slide: Slide }) {
	}
}

export class AddSlides implements Action {
	public readonly type = SlideActionsTypes.AddSlides;

	constructor(public payload: { slides: Slide[] }) {
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

export class RemoveSlidesByColumn implements Action {
	public readonly type = SlideActionsTypes.RemoveSlidesByColumn;

	constructor(public payload: { slideIds: number[] }) {
	}
}

export class ClearSlides implements Action {
	public readonly type = SlideActionsTypes.ClearSlides;
}

export class UpdateSlideActions implements Action {
	public readonly type = SlideActionsTypes.UpdateSlideActions;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export type SlideActions =
	AddSlideToPresentation
	| AddSlides
	| MoveSlideToNewCreatedColumn
	| MoveSlideBetweenColumns
	| UpdateSlidePosition
	| SwapSlideInTheSameColumn
	| SwapSlideInTheDifferentColumns
	| MoveBetweenSlidesInTheSameColumn
	| MoveBetweenSlidesInTheDifferentColumn
	| RemoveSlide
	| RemoveSlidesByColumn
	| ClearSlides
	| UpdateSlideActions;
