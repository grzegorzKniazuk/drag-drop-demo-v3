import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PresentationCreatorState } from 'src/app/modules/dashboard/modules/presentation-creator/store/index';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';

export const selectPresentationCreatorState = createFeatureSelector<PresentationCreatorState>(StoreFeatureNames.PRESENTATION_CREATOR);

export const selectSlidesState = createSelector(
	selectPresentationCreatorState,
	state => state.slides,
);

export const selectColumnsState = createSelector(
	selectPresentationCreatorState,
	state => state.columns,
);

export const selectCreatorOptionsState = createSelector(
	selectPresentationCreatorState,
	state => state.options,
);

export const selectCreatorMetadataState = createSelector(
	selectPresentationCreatorState,
	state => state.metadata,
);
