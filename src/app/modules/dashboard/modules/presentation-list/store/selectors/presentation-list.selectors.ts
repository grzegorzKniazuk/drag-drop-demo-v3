import { createSelector } from '@ngrx/store';
import { selectPresentationListState } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/module-base.selectors';
import * as presentationListEntitySelectors from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';
import { Presentation } from 'src/app/shared/interfaces';

export const selectPresentationList = createSelector(
	selectPresentationListState,
	presentationListEntitySelectors.selectAll,
);

export const selectAmountOfPresentations = createSelector(
	selectPresentationListState,
	presentationListEntitySelectors.selectTotal,
);

export const selectPresentationById = createSelector(
	selectPresentationList,
	(presentation: Presentation[], props: { id: number }) => {
		return presentation.find((presentation: Presentation) => {
			return presentation.id === props.id;
		});
	},
);
