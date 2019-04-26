import { createSelector } from '@ngrx/store';
import * as libraryEntitySelectors from 'src/app/modules/dashboard/store/reducers/library.reducer';
import { selectLibraryState } from 'src/app/modules/dashboard/store/selectors/dashboard.selectors';


export const selectLibrarySlidesAmount = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectTotal,
);

export const selectLibrarySlides = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectAll,
);


