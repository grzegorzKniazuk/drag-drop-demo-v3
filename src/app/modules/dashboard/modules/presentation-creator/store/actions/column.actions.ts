import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnActionsTypes {
	AddColumnFromAnotherColumn = '[Column] Add Column From Another Column',
	AddColumnFromLibrary = '[Column] Add Column From Library'
}

export class AddColumnFromAnotherColumn implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromAnotherColumn;

	constructor(public payload: { targetColumn: Column, sourceSlideId: number, sourceColumnId: number }) {
	}
}

export class AddColumnFromLibrary implements Action {
	public readonly type = ColumnActionsTypes.AddColumnFromLibrary;

	constructor(public payload: { targetColumn: Column, sourceSlideId: number }) {
	}
}

export type ColumnActions = AddColumnFromAnotherColumn | AddColumnFromLibrary;
