import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from 'src/app/modules/dashboard/store/index';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectLibraryState = createSelector(
	selectDashboardState,
	state => state.library,
);
