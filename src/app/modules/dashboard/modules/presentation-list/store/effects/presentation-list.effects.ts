import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { PresentationListActionsTypes, SAVE_PRESENTATION, UPDATE_PRESENTATION } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { concatMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AddColumns, AddSlides, ClearColumns, ClearPresentationMetadata, ClearSlides, SetPresentationId, SetPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class PresentationListEffects {

	@Effect({ dispatch: true })
	public savePresentation$ = this.actions$.pipe(
		ofType(PresentationListActionsTypes.SAVE_PRESENTATION),
		tap((action: SAVE_PRESENTATION) => {
			this.router.navigateByUrl('/dashboard/presentation-list')
			    .then(() => {
				    this.localStorage.setItemSubscribe('presentation', action.payload.presentation);
				    this.toastService.success('Prezentacja została zapisana');
			    });
		}),
		concatMap(() => {
			return [
				new ClearPresentationMetadata(),
				new ClearColumns(),
				new ClearSlides(),
			];
		}),
	);

	@Effect({ dispatch: false })
	public removePresentation$ = this.actions$.pipe(
		ofType(PresentationListActionsTypes.REMOVE_PRESENTATION),
		tap(() => {
			this.toastService.success('Prezentacja została usunięta');
		}),
	);

	@Effect({ dispatch: true })
	public updatePresentation$ = this.actions$.pipe(
		ofType(PresentationListActionsTypes.UPDATE_PRESENTATION),
		tap(() => {
			this.router.navigateByUrl('/dashboard/presentation-creator');
		}),
		concatMap((action: UPDATE_PRESENTATION) => {
			return [
				new SetPresentationId({ presentationId: action.payload.id }),
				new SetPresentationTitle({ presentationTitle: action.payload.title }),
				new AddSlides({ slides: action.payload.slides }),
				new AddColumns({ columns: action.payload.columns }),
			];
		}),
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private toastService: ToastService,
		private localStorage: LocalStorage,
	) {
	}
}
