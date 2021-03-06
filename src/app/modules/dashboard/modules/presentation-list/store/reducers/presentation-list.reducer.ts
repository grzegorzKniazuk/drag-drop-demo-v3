import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Presentation } from 'src/app/shared/interfaces';
import { PresentationListActions, PresentationListActionsTypes } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';

export interface PresentationListState extends EntityState<Presentation> {
}

export const presentationListAdapter: EntityAdapter<Presentation> = createEntityAdapter<Presentation>();

export const initialPresentationListState: PresentationListState = presentationListAdapter.getInitialState();

export function presentationListReducer(state = initialPresentationListState, action: PresentationListActions): PresentationListState {
	switch (action.type) {
		case PresentationListActionsTypes.SAVE_PRESENTATION: {
			return presentationListAdapter.upsertOne(action.payload.presentation, state);
		}
		case PresentationListActionsTypes.REMOVE_PRESENTATION: {
			return presentationListAdapter.removeOne(action.payload.presentationId, state);
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
} = presentationListAdapter.getSelectors();
