import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddColumn, ColumnActionsTypes } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { map } from 'rxjs/operators';
import { MoveSlide } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';

@Injectable({
	providedIn: 'root',
})
export class ColumnEffects {

	@Effect()
	public addColumn$ = this.actions$.pipe(
		ofType<AddColumn>(ColumnActionsTypes.AddColumn),
		map((action: AddColumn) => {
			return new MoveSlide({
				slidesIds: action.payload.targetColumn.slidesIds,
				sourceColumnId: action.payload.sourceColumnId,
				targetColumnId: action.payload.targetColumn.id,
			});
		}),
	);

	constructor(
		private actions$: Actions,
	) {
	}
}
