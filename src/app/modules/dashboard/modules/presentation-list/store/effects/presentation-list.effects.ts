import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { PresentationListActionsTypes, RemovePresentation, SavePresentation } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { concatMap, map, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { ClearPresentationMetadata } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';
import { ClearColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { ClearSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';

@Injectable()
export class PresentationListEffects {

	@Effect({ dispatch: true })
	public savePresentation$: Observable<ClearPresentationMetadata | ClearColumns | ClearSlides> = this.actions$.pipe(
		ofType<SavePresentation>(PresentationListActionsTypes.SavePresentation),
		map(() => {
			return fromPromise(this.router.navigateByUrl('/dashboard/presentation-list').then(() => {
				this.toastService.success('Prezentacja została zapisana');
			}));
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
		ofType(PresentationListActionsTypes.RemovePresentation),
		tap(() => {
			this.toastService.success('Prezentacja została usunięta');
		}),
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private toastService: ToastService,
	) {
	}
}
