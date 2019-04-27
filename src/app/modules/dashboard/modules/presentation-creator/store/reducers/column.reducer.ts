import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';
import { ColumnActions, ColumnActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';

export interface ColumnState extends EntityState<Column> {

}

export const columnAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialColumnState: ColumnState = columnAdapter.getInitialState();

export function columnReducer(state = initialColumnState, action: ColumnActions): ColumnState {
	switch (action.type) {
		case ColumnActionsTypes.AddColumnFromAnotherColumn:
		case ColumnActionsTypes.AddColumnFromLibrary: {
			return columnAdapter.addOne(action.payload.column, state);
		}
		case ColumnActionsTypes.UpdateColumn: {
			return columnAdapter.updateOne(action.payload.targetColumn, state);
		}
		default: {
			return {
				...state,
			};
		}
	}
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = columnAdapter.getSelectors();
