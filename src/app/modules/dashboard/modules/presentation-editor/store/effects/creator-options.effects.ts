import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CreatorOptionsActionsTypes } from '../actions/creator-options.actions';
import { concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ClearColumns } from '../actions/column.actions';
import { ClearPresentationMetadata } from '../actions/creator-metadata.actions';
import { ClearSlides } from '../actions/slide.actions';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorOptionsEffects {

	@Effect({ dispatch: true })
	public leaveEditor: Observable<ClearPresentationMetadata | ClearColumns | ClearSlides> = this.actions$.pipe(
		ofType(CreatorOptionsActionsTypes.LeaveEditor),
		map(() => {
			return fromPromise(this.router.navigateByUrl('./presentation-list'));
		}),
		concatMap(() => {
			return [
				new ClearPresentationMetadata(),
				new ClearColumns(),
				new ClearSlides(),
			];
		}),
	);

	constructor(
		private router: Router,
		private actions$: Actions,
	) {
	}
}
