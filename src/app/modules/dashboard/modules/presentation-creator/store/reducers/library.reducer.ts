import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';
import { LibraryActions, LibraryActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/library.actions';

export interface LibraryState extends EntityState<Slide> {

}

export const libraryAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialLibraryState: LibraryState = libraryAdapter.getInitialState();

export function libraryReducer(state = initialLibraryState, action: LibraryActions): LibraryState {
	switch (action.type) {
		case LibraryActionsTypes.AddSlidesToLibrary: {
			return libraryAdapter.addMany(action.payload.slides, state);
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
