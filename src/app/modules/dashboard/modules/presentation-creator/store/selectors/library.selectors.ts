import { createSelector } from '@ngrx/store';
import { selectLibraryState } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/presentation-creator.selectors';
import * as libraryEntitySelectors from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/library.reducer';

export const selectLibrarySlidesAmount = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectTotal,
);

export const selectLibrarySlides = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectAll,
);
