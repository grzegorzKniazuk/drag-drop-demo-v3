import { createFeatureSelector } from '@ngrx/store';
import { PresentationListState } from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';

export const selectPresentationListState = createFeatureSelector<PresentationListState>(StoreFeatureNames.PRESENTATION_LIST);
