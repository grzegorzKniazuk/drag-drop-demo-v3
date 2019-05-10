import { createSelector } from '@ngrx/store';
import { selectCreatorOptionsState } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors/module-base.selectors';

export const selectIsLibrarySliderOpen = createSelector(
	selectCreatorOptionsState,
	state => state.isLibrarySliderOpen,
);
