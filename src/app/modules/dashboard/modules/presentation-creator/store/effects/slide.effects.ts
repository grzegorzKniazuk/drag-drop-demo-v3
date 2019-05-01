import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddSlideToPresentation,
	RemoveSlide,
	SlideActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { map, tap } from 'rxjs/operators';
import { RemoveSlideFromLibrary } from 'src/app/modules/dashboard/store/actions/library.actions';
import { ToastService } from 'src/app/shared/services/toast.service';

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
