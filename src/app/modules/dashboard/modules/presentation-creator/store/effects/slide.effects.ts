import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddSlideToPresentation, SlideActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { map } from 'rxjs/operators';
import { RemoveSlideFromLibrary } from 'src/app/modules/dashboard/store/actions/library.actions';

@Injectable({
	providedIn: 'root',
})
export class SlideEffects {

	@Effect({ dispatch: true })
	public addSlideToPresentation$ = this.actions$.pipe(
		ofType<AddSlideToPresentation>(SlideActionsTypes.AddSlideToPresentation),
		map((action: AddSlideToPresentation) => {
			return new RemoveSlideFromLibrary({
				slideId: action.payload.slide.id,
			});
		}),
	);

	constructor(
		private actions$: Actions,
	) {
	}
}
