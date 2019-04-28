import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SlideActionsTypes, UpdateSlideColumnPosition } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SlideEffects {

	@Effect({ dispatch: false })
	public updateSlideColumnPosition$ = this.actions$.pipe(
		ofType<UpdateSlideColumnPosition>(SlideActionsTypes.UpdateSlideColumnPosition),
		tap(() => {

		}),
	);

	constructor(
		private actions$: Actions,
	) {
	}
}
