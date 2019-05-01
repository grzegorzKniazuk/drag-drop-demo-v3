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
	presentationTitle: 'moja prezentacja',
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
		default: {
			return {
				...state,
			};
		}
	}
}
