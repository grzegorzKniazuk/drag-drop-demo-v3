import { createSelector } from '@ngrx/store';
import { selectCreatorMetadataState } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors/module-base.selectors';

export const selectEditorPresentationTitle = createSelector(
	selectCreatorMetadataState,
	state => state.presentationTitle,
);
