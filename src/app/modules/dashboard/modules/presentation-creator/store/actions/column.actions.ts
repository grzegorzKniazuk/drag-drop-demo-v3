import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/interfaces/column';

export enum ColumnActionsTypes {
	AddColumn = '[Slide] Add Column',
}

export class AddColumn implements Action {
	public readonly type = ColumnActionsTypes.AddColumn;

	constructor(public payload: { column: Column }) {
	}
}

export type ColumnActions = AddColumn;
