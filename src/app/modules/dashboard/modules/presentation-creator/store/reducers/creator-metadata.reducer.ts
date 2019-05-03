import {
	CreatorMetadataActions,
	CreatorMetadataActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';

export interface CreatorMetadataState {
	presentationId: number;
	presentationTitle: string;
}

export const initialCreatorMetadataState: CreatorMetadataState = {
	presentationId: null,
	presentationTitle: null,
};

export function creatorMetadataReducer(state = initialCreatorMetadataState, action: CreatorMetadataActions): CreatorMetadataState {
	switch (action.type) {
		case CreatorMetadataActionsTypes.SetPresentationId: {
			return {
				...state,
				presentationId: action.payload.presentationId,
			};
		}
		case CreatorMetadataActionsTypes.SetPresentationTitle: {
			return {
				...state,
				presentationTitle: action.payload.presentationTitle,
			};
		}
		case CreatorMetadataActionsTypes.ClearPresentationMetadata: {
			return {
				...initialCreatorMetadataState,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
}
