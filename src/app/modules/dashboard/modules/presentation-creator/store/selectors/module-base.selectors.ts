import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PresentationCreatorState } from 'src/app/modules/dashboard/modules/presentation-creator/store/index';

export const selectPresentationCreatorState = createFeatureSelector<PresentationCreatorState>('presentation-creator');

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
