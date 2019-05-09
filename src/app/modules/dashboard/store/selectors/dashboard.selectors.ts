import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from 'src/app/modules/dashboard/store/index';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';

export const selectDashboardState = createFeatureSelector<DashboardState>(StoreFeatureNames.DASHBOARD);

export const selectLibraryState = createSelector(
	selectDashboardState,
	state => state.library,
);
