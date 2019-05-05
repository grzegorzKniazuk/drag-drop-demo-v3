import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { PresentationListActionsTypes, SavePresentation, UpdatePresentation } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { concatMap, map, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { ClearPresentationMetadata, SetPresentationId, SetPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';
import { AddColumns, ClearColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AddSlides, ClearSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class PresentationListEffects {

	@Effect({ dispatch: true })
	public savePresentation$: Observable<ClearPresentationMetadata | ClearColumns | ClearSlides> = this.actions$.pipe(
		ofType(PresentationListActionsTypes.SavePresentation),
		map((action: SavePresentation) => {
			return fromPromise(this.router.navigateByUrl('/dashboard/presentation-list').then(() => {
				this.localStorage.setItemSubscribe('presentation', action.payload.presentation);
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
	public removePresentation$: Observable<void> = this.actions$.pipe(
		ofType(PresentationListActionsTypes.RemovePresentation),
		tap(() => {
			this.toastService.success('Prezentacja została usunięta');
		}),
	);

	@Effect({ dispatch: true })
	public updatePresentation$: Observable<SetPresentationId | SetPresentationTitle | AddSlides | AddColumns> = this.actions$.pipe(
		ofType(PresentationListActionsTypes.UpdatePresentation),
		tap(() => {
			return fromPromise(this.router.navigateByUrl('/dashboard/presentation-creator'));
		}),
		concatMap((action: UpdatePresentation) => {
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
