import { createSelector } from '@ngrx/store';
import { selectColumnsState } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors/module-base.selectors';
import * as columnEntitySelectors from 'src/app/modules/dashboard/modules/presentation-editor/store/reducers/column.reducer';
import { Column } from 'src/app/shared/interfaces';

export const selectColumns = createSelector(
	selectColumnsState,
	columnEntitySelectors.selectAll,
);

export const selectAmountOfColumns = createSelector(
	selectColumnsState,
	columnEntitySelectors.selectTotal,
);

export const selectColumnPositionById = createSelector(
	selectColumns,
	(columns: Column[], props: { columnId: number }) => {
		return columns.find((column: Column) => {
			return column.id === props.columnId;
		}).position;
	},
);
