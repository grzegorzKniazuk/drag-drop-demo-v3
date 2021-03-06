import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces';
import { LibraryActions, LibraryActionsTypes } from 'src/app/modules/dashboard/store/actions/library.actions';

export interface LibraryState extends EntityState<Slide> {

}

export const libraryAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialLibraryState: LibraryState = libraryAdapter.getInitialState();

export function libraryReducer(state = initialLibraryState, action: LibraryActions): LibraryState {
	switch (action.type) {
		case LibraryActionsTypes.ADD_SLIDES: {
			return libraryAdapter.addMany(action.payload.slides, state);
		}
		case LibraryActionsTypes.REMOVE_SLIDE: {
			return libraryAdapter.removeOne(action.payload.slideId, state);
		}
		default: {
			return {
				...state,
			};
		}
	}
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = libraryAdapter.getSelectors();
