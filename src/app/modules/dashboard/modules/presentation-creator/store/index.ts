import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { slideReducer, SlideState } from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/slide.reducer';
import { columnReducer, ColumnState } from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/column.reducer';
import { libraryReducer, LibraryState } from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/library.reducer';

export interface PresentationCreatorState {
	library: LibraryState,
	slides: SlideState,
	columns: ColumnState,
}

export const reducers: ActionReducerMap<PresentationCreatorState> = {
	library: libraryReducer,
	slides: slideReducer,
	columns: columnReducer,
};

export const metaReducers: MetaReducer<PresentationCreatorState>[] = environment.production ? [] : [ storeFreeze ];
