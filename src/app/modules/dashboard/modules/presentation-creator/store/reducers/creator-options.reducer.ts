import {
	CreatorOptionsActions,
	CreatorOptionsActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';

export interface CreatorOptionsState {
	isLibrarySliderOpen: boolean;
	isEditorReadyToSave: boolean;
}

export const initialCreatorOptionsState: CreatorOptionsState = {
	isLibrarySliderOpen: false,
	isEditorReadyToSave: false,
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
		case CreatorOptionsActionsTypes.SetEditorReadyToSave: {
			return {
				...state,
				isEditorReadyToSave: true,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
}
