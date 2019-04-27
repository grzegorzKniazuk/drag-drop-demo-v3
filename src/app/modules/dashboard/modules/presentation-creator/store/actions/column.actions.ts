import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum ColumnActionsTypes {
	AddColumnFromAnotherColumn = '[Column] Add Column From Another Column',
	AddColumnFromLibrary = '[Column] Add Column From Library',
	AddSlideFromLibraryToExistingColumn = '[Column] Add Slide From Library To Existing Column',
	AddSlideFromAnotherColumnToExistingColumn = '[Column] Add Slide From Another Column To Existing Column',
	UpdateColumn = '[Column] Update Column Title',
}

export class AddColumnFromAnotherColumn implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromAnotherColumn;

	constructor(public payload: { targetColumn: Column, sourceSlide: Slide, sourceColumnId: number }) {
	}
}

export class AddColumnFromLibrary implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromLibrary;

	constructor(public payload: { targetColumn: Column, sourceSlide: Slide }) {
	}
}

export class AddSlideFromLibraryToExistingColumn implements Action {
	public readonly type = ColumnActionsTypes.AddSlideFromLibraryToExistingColumn;

	constructor(public payload: { targetColumnId: number, sourceSlide: Slide }) {
	}
}

export class UpdateColumn implements Action {
	public readonly type = ColumnActionsTypes.UpdateColumn;

	constructor(public payload: { column: Update<Column> }) {
	}
}

export type ColumnActions = AddColumnFromAnotherColumn | AddColumnFromLibrary | UpdateColumn | AddSlideFromLibraryToExistingColumn;
