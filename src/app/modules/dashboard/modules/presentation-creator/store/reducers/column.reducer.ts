import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ColumnActions, ColumnActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions';
import { Comparer } from '@ngrx/entity/src/models';
import { Column } from 'src/app/shared/interfaces';

export interface ColumnState extends EntityState<Column> {

}

export const columnSortComparer: Comparer<Column> = ((a: Column, b: Column): number => {
	if (a.position === null || a.position > b.position) {
		return 1;
	} else if (a.position < b.position) {
		return -1;
	} else {
		return 0;
	}
});

export const columnAdapter: EntityAdapter<Column> = createEntityAdapter<Column>({
	selectId: (column: Column) => column.id,
	sortComparer: columnSortComparer,
});

export const initialColumnState: ColumnState = columnAdapter.getInitialState();

export function columnReducer(state = initialColumnState, action: ColumnActions): ColumnState {
	switch (action.type) {
		case ColumnActionsTypes.AddColumnBetweenExistingColumns:
		case ColumnActionsTypes.AddColumnBetweenExistingColumnsByLibrarySlide:
		case ColumnActionsTypes.AddColumnFromAnotherColumn:
		case ColumnActionsTypes.AddColumnFromLibrary: {
			return columnAdapter.addOne(action.payload.column, state);
		}
		case ColumnActionsTypes.AddColumns: {
			return columnAdapter.addMany(action.payload.columns, state);
		}
		case ColumnActionsTypes.UpdateColumnTitle: {
			return columnAdapter.updateOne(action.payload.targetColumn, state);
		}
		case ColumnActionsTypes.AddSlideFromLibraryToExistingColumn: {
			return {
				...state,
			};
		}
		case ColumnActionsTypes.UpdateColumnsPosition: {
			return columnAdapter.updateOne(action.payload.column, state);
		}
		case ColumnActionsTypes.RemoveColumn: {
			return columnAdapter.removeOne(action.payload.columnId, state);
		}
		case ColumnActionsTypes.ClearColumns: {
			return columnAdapter.removeAll(state);
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
