import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column, Slide } from 'src/app/shared/interfaces';

export enum ColumnActionsTypes {
	AddColumnFromAnotherColumn = '[Column] Add Column From Another Column',
	AddColumnFromLibrary = '[Column] Add Column From Library',
	AddColumns = '[Column] Add Columns',
	AddSlideFromLibraryToExistingColumn = '[Column] Add Slide From Library To Existing Column',
	UpdateColumnTitle = '[Column] Update Column Title',
	AddColumnBetweenExistingColumns = '[Column] Add Column Between Existing Columns',
	AddColumnBetweenExistingColumnsByLibrarySlide = '[Column] Add Column Between Existing Columns By Library Slide',
	UpdateColumnsPosition = '[Column] Update Columns Position',
	RemoveColumn = '[Column] Remove Column',
	ClearColumns = '[Column] Clear Columns',
}

export class AddColumnFromAnotherColumn implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromAnotherColumn;

	constructor(public payload: { column: Column, sourceSlideId: number, sourceColumnId: number }) {
	}
}

export class AddColumnFromLibrary implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromLibrary;

	constructor(public payload: { column: Column, sourceSlide: Slide }) {
	}
}

export class AddColumns implements Action {
	public readonly type = ColumnActionsTypes.AddColumns;

	constructor(public payload: { columns: Column[] }) {
	}
}

export class AddSlideFromLibraryToExistingColumn implements Action {
	public readonly type = ColumnActionsTypes.AddSlideFromLibraryToExistingColumn;

	constructor(public payload: { sourceSlide: Slide }) {
	}
}

export class UpdateColumnTitle implements Action {
	public readonly type = ColumnActionsTypes.UpdateColumnTitle;

	constructor(public payload: { targetColumn: Update<Column> }) {
	}
}

export class AddColumnBetweenExistingColumns implements Action {
	public readonly type = ColumnActionsTypes.AddColumnBetweenExistingColumns;

	constructor(public payload: { column: Column, sourceSlide: Slide }) {
	}
}

export class AddColumnBetweenExistingColumnsByLibrarySlide implements Action {
	public readonly type = ColumnActionsTypes.AddColumnBetweenExistingColumnsByLibrarySlide;

	constructor(public payload: { column: Column, sourceSlide: Slide }) {
	}
}

export class UpdateColumnsPosition implements Action {
	public readonly type = ColumnActionsTypes.UpdateColumnsPosition;

	constructor(public payload: { column: Update<Column> }) {
	}
}

export class RemoveColumn implements Action {
	public readonly type = ColumnActionsTypes.RemoveColumn;

	constructor(public payload: { columnId: number, columnSlidesIds: number[] }) {
	}
}

export class ClearColumns implements Action {
	public readonly type = ColumnActionsTypes.ClearColumns;
}

export type ColumnActions =
	AddColumnFromAnotherColumn
	| AddColumnFromLibrary
	| AddColumns
	| UpdateColumnTitle
	| AddSlideFromLibraryToExistingColumn
	| AddColumnBetweenExistingColumns
	| AddColumnBetweenExistingColumnsByLibrarySlide
	| UpdateColumnsPosition
	| RemoveColumn
	| ClearColumns;
