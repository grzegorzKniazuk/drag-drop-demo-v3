import { Action } from '@ngrx/store';

export enum CreatorOptionsActionsTypes {
	ShowLibrarySlider = '[Creator] Show Library Slider',
	HideLibrarySlider = '[Creator] Hide Library Slider',
	LeaveEditor = '[Creator] Leave Editor',
}

export class ShowLibrarySlider implements Action {
	public readonly type = CreatorOptionsActionsTypes.ShowLibrarySlider;
}

export class HideLibrarySlider implements Action {
	public readonly type = CreatorOptionsActionsTypes.HideLibrarySlider;
}

export class LeaveEditor implements Action {
	public readonly type = CreatorOptionsActionsTypes.LeaveEditor;
}

export type CreatorOptionsActions = ShowLibrarySlider | HideLibrarySlider | LeaveEditor;
