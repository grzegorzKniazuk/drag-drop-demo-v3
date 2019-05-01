import { createSelector } from '@ngrx/store';
import { selectPresentationListState } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/module-base.selectors';
import * as presentationListEntitySelectors from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';

export const selectPresentationList = createSelector(
	selectPresentationListState,
	presentationListEntitySelectors.selectAll,
);
