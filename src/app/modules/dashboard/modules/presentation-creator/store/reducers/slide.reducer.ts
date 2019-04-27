import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';
import { SlideActions, SlideActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';

export interface SlideState extends EntityState<Slide> {

}

export const slideAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();

export const initialSlideState: SlideState = slideAdapter.getInitialState();

export function slideReducer(state = initialSlideState, action: SlideActions): SlideState {
	switch (action.type) {
		case SlideActionsTypes.AddSlideToPresentation: {
			return slideAdapter.addOne(action.payload.slide, state);
		}
		case SlideActionsTypes.UpdateSlideInPresentation: {
			return slideAdapter.updateOne(action.payload.slide, state);
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
} = slideAdapter.getSelectors();
