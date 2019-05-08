import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SlideActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SlideEffects {

	@Effect({ dispatch: false })
	public removeSlide$ = this.actions$.pipe(
		ofType(SlideActionsTypes.RemoveSlide),
		tap(() => {
			this.toastService.success('Usunięto slajd');
		}),
	);

	@Effect({ dispatch: false })
	public updateSlideActions$ = this.actions$.pipe(
		ofType(SlideActionsTypes.UpdateSlideActions),
		tap(() => {
			this.ngZone.run(() => {
				this.router.navigateByUrl('/dashboard/presentation-creator').then(() => {
					this.toastService.success('Zapisano akcje dla slajdu');
				});
			});
		}),
	);

	constructor(
		private toastService: ToastService,
		private actions$: Actions,
		private router: Router,
		private ngZone: NgZone,
	) {
	}
}
