import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum ColumnActionsTypes {
	AddColumnFromAnotherColumn = '[Column] Add Column From Another Column',
	AddColumnFromLibrary = '[Column] Add Column From Library',
	AddSlideFromLibraryToExistingColumn = '[Column] Add Slide From Library To Existing Column',
	UpdateColumnTitle = '[Column] Update Column Title',
	AddColumnBetweenExistingColumns = '[Column] Add Column Between Existing Columns',
	AddColumnBetweenExistingColumnsByLibrarySlide = '[Column] Add Column Between Existing Columns By Library Slide',
	UpdateColumnsPositions = '[Column] Update Columns Positions',
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

export class AddSlideFromLibraryToExistingColumn implements Action {
	public readonly type = ColumnActionsTypes.AddSlideFromLibraryToExistingColumn;

	constructor(public payload: { sourceSlide: Slide, targetColumnId: number, targetSlidePosition: number }) {
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

export class UpdateColumnsPositions implements Action {
	public readonly type = ColumnActionsTypes.UpdateColumnsPositions;

	constructor(public payload: { columns: Update<Column>[] }) {
	}
}

export type ColumnActions =
	AddColumnFromAnotherColumn
	| AddColumnFromLibrary
	| UpdateColumnTitle
	| AddSlideFromLibraryToExistingColumn
	| AddColumnBetweenExistingColumns
	| AddColumnBetweenExistingColumnsByLibrarySlide
	| UpdateColumnsPositions;
