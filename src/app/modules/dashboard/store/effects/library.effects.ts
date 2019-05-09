import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LibraryActionsTypes } from 'src/app/modules/dashboard/store/actions/library.actions';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class LibraryEffects {

	@Effect({ dispatch: false })
	public removeSlideFromLibrary$ = this.actions$.pipe(
		ofType(LibraryActionsTypes.REMOVE_SLIDE),
		tap(() => {
			this.toastService.success('Usunięto slajd z biblioteki');
		}),
	);

	constructor(
		private toastService: ToastService,
		private actions$: Actions,
	) {
	}
}
