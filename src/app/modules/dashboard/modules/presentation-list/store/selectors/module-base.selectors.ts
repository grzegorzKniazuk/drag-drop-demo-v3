import { createFeatureSelector } from '@ngrx/store';
import { PresentationListState } from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';

export const selectPresentationListState = createFeatureSelector<PresentationListState>('presentation-list');
