import { Action } from '@ngrx/store';

export enum CreatorMetadataActionsTypes {
	SetPresentationTitle = '[Metadata] Set Presentation Title',
	SetPresentationId = '[Metadata] Set Presentation Id',
}

export class SetPresentationTitle implements Action {
	public readonly type = CreatorMetadataActionsTypes.SetPresentationTitle;

	constructor(public payload: { presentationTitle: string }) {
	}
}
export class SetPresentationId implements Action {
	public readonly type = CreatorMetadataActionsTypes.SetPresentationId;

	constructor(public payload: { presentationId: number }) {
	}
}

export type CreatorMetadataActions = SetPresentationTitle | SetPresentationId;
