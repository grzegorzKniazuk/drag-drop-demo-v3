import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Slide } from 'src/app/shared/interfaces/slide';
import { SlideActions, SlideActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { Comparer } from '@ngrx/entity/src/models';

export interface SlideState extends EntityState<Slide> {
}

export const slideSortComparer: Comparer<Slide> = ((a: Slide, b: Slide): number => {
	if (a.position === null || a.position > b.position) {
		return  1;
	} else if (a.position < b.position) {
		return -1;
	} else {
		return 0;
	}
});

export const slideAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>({
	selectId: (slide: Slide) => slide.id,
	sortComparer: slideSortComparer,
});

export const initialSlideState: SlideState = slideAdapter.getInitialState();

export function slideReducer(state = initialSlideState, action: SlideActions): SlideState {
	switch (action.type) {
		case SlideActionsTypes.AddSlideToPresentation: {
			return slideAdapter.addOne(action.payload.slide, state);
		}
		case SlideActionsTypes.UpdateSlidePositionInColumn:
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
