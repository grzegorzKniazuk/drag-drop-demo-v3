import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { slideReducer, SlideState } from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/slide.reducer';
import { columnReducer, ColumnState } from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/column.reducer';

export interface PresentationCreatorState {
	slides: SlideState,
	columns: ColumnState,
}

export const reducers: ActionReducerMap<PresentationCreatorState> = {
	slides: slideReducer,
	columns: columnReducer,
};

export const metaReducers: MetaReducer<PresentationCreatorState>[] = environment.production ? [] : [ storeFreeze ];
