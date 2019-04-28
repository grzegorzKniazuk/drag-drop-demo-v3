import { createSelector } from '@ngrx/store';
import { selectColumnsState } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/presentation-creator.selectors';
import * as columnEntitySelectors from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/column.reducer';

export const selectColumns = createSelector(
	selectColumnsState,
	columnEntitySelectors.selectAll,
);

export const selectAmountOfColumns = createSelector(
	selectColumnsState,
	columnEntitySelectors.selectTotal,
);
