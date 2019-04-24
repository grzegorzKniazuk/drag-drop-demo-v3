import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface DashboardState {

}

export const reducers: ActionReducerMap<DashboardState> = {};

export const metaReducers: MetaReducer<DashboardState>[] = environment.production ? [] : [ storeFreeze ];
