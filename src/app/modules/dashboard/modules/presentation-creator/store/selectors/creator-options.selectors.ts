import { createSelector } from '@ngrx/store';
import { selectCreatorOptionsState } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/module-base.selectors';

export const selectIsLibrarySliderOpen = createSelector(
	selectCreatorOptionsState,
	state => state.isLibrarySliderOpen,
);
