import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import {
	PresentationListActions,
	PresentationListActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';

export interface PresentationListState extends EntityState<Presentation> {
}

export const presentationListAdapter: EntityAdapter<Presentation> = createEntityAdapter<Presentation>();

export const initialPresentationListState: PresentationListState = presentationListAdapter.getInitialState();

export function presentationListReducer(state = initialPresentationListState, action: PresentationListActions): PresentationListState {
	switch (action.type) {
		case PresentationListActionsTypes.SavePresentation: {
			return presentationListAdapter.addOne(action.payload.presentation, state);
		}
		default: {
			return {
				...state,
			};
		}
	}
}
