import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { slideReducer, SlideState } from 'src/app/modules/dashboard/modules/presentation-editor/store/reducers/slide.reducer';
import { columnReducer, ColumnState } from 'src/app/modules/dashboard/modules/presentation-editor/store/reducers/column.reducer';
import { creatorOptionsReducer, CreatorOptionsState } from 'src/app/modules/dashboard/modules/presentation-editor/store/reducers/creator-options.reducer';
import { creatorMetadataReducer, CreatorMetadataState } from 'src/app/modules/dashboard/modules/presentation-editor/store/reducers/creator-metadata.reducer';

export interface PresentationCreatorState {
	slides: SlideState,
	columns: ColumnState,
	options: CreatorOptionsState,
	metadata: CreatorMetadataState,
}

export const reducers: ActionReducerMap<PresentationCreatorState> = {
	slides: slideReducer,
	columns: columnReducer,
	options: creatorOptionsReducer,
	metadata: creatorMetadataReducer,
};

export const metaReducers: MetaReducer<PresentationCreatorState>[] = environment.production ? [] : [ storeFreeze ];
