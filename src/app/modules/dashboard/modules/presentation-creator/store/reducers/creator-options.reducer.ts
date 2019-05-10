import { CreatorOptionsActions, CreatorOptionsActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions';

export interface CreatorOptionsState {
	isLibrarySliderOpen: boolean;
}

export const initialCreatorOptionsState: CreatorOptionsState = {
	isLibrarySliderOpen: false,
};

export function creatorOptionsReducer(state = initialCreatorOptionsState, action: CreatorOptionsActions): CreatorOptionsState {
	switch (action.type) {
		case CreatorOptionsActionsTypes.ShowLibrarySlider: {
			return {
				...state,
				isLibrarySliderOpen: true,
			};
		}
		case CreatorOptionsActionsTypes.HideLibrarySlider: {
			return {
				...state,
				isLibrarySliderOpen: false,
			};
		}
		case CreatorOptionsActionsTypes.LeaveEditor: {
			return {
				...initialCreatorOptionsState,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
}
