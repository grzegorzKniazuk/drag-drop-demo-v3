import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { libraryReducer, LibraryState } from 'src/app/modules/dashboard/store/reducers/library.reducer';

export interface DashboardState {
	library: LibraryState,
}

export const reducers: ActionReducerMap<DashboardState> = {
	library: libraryReducer,
};

export const metaReducers: MetaReducer<DashboardState>[] = environment.production ? [] : [ storeFreeze ];
