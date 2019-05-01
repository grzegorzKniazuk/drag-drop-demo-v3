import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RemoveSlide, SlideActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
	providedIn: 'root',
})
export class SlideEffects {

	@Effect({ dispatch: false })
	public removeSlide$ = this.actions$.pipe(
		ofType<RemoveSlide>(SlideActionsTypes.RemoveSlide),
		tap(() => {
			this.toastService.success('Usunięto slajd');
		}),
	);

	constructor(
		private toastService: ToastService,
		private actions$: Actions,
	) {
	}
}
