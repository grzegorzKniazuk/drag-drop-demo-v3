import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Update } from '@ngrx/entity';

export enum ColumnActionsTypes {
	AddColumnFromAnotherColumn = '[Column] Add Column From Another Column',
	AddColumnFromLibrary = '[Column] Add Column From Library',
	AddSlideFromLibraryToExistingColumn = '[Column] Add Slide From Library To Existing Column',
	UpdateColumnTitle = '[Column] Update Column Title',
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

export type ColumnActions = AddColumnFromAnotherColumn | AddColumnFromLibrary | UpdateColumnTitle | AddSlideFromLibraryToExistingColumn;
