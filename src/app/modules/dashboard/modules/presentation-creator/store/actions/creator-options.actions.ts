import { Action } from '@ngrx/store';

export enum CreatorOptionsActionsTypes {
	ShowLibrarySlider = '[Creator] Show Library Slider',
	HideLibrarySlider = '[Creator] Hide Library Slider',
	SetEditorReadyToSave = '[Creator] Set Editor Ready To Save',
}

export class ShowLibrarySlider implements Action {
	public readonly type = CreatorOptionsActionsTypes.ShowLibrarySlider;
}

export class HideLibrarySlider implements Action {
	public readonly type = CreatorOptionsActionsTypes.HideLibrarySlider;
}

export class SetEditorReadyToSave implements Action {
	public readonly type = CreatorOptionsActionsTypes.SetEditorReadyToSave;
}

export type CreatorOptionsActions = ShowLibrarySlider | HideLibrarySlider | SetEditorReadyToSave;
