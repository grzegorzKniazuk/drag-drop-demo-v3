import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
	PresentationListActionsTypes,
	SavePresentation,
} from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class PresentationListEffects {

	@Effect({ dispatch: false })
	public savePresentation$ = this.actions$.pipe(
		ofType<SavePresentation>(PresentationListActionsTypes.SavePresentation),
		tap(() => {
			this.ngZone.run(() => {
				this.router.navigateByUrl('/dashboard/presentation-list')
				    .then(() => {
					    this.toastService.success('Prezentacja została zapisana');
				    });
			});
		}),
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private ngZone: NgZone,
		private toastService: ToastService,
	) {
	}
}
