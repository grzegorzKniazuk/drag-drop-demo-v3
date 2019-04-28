import { Action } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum SlideActionsTypes {
	AddSlideToPresentation = '[Slide] Add Slide In Presentation',
	MoveSlideToNewCreatedColumn = '[Slide] Move Slide To New Created Column',
	MoveSlideBetweenColumns = '[Slide] Move Slide Between Columns',
	UpdateSlideColumnPosition = '[Slide] Update Slide Column Position'
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

export class UpdateSlideColumnPosition implements Action {
	public readonly type = SlideActionsTypes.UpdateSlideColumnPosition;

	constructor(public payload: { slide: Update<Slide> }) {
	}
}

export type SlideActions = AddSlideToPresentation | MoveSlideToNewCreatedColumn | MoveSlideBetweenColumns | UpdateSlideColumnPosition;
