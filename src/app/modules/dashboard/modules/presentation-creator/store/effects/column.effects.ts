import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddColumnFromLibrary,
	AddSlideFromLibraryToExistingColumn,
	ColumnActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { switchMap } from 'rxjs/operators';
import { AddSlideToPresentation } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { RemoveSlideFromLibrary } from 'src/app/modules/dashboard/store/actions/library.actions';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ColumnEffects {

	@Effect()
	public addColumnFromLibrary$: Observable<AddSlideToPresentation | RemoveSlideFromLibrary> = this.actions$.pipe(
		ofType<AddColumnFromLibrary>(ColumnActionsTypes.AddColumnFromLibrary),
		switchMap((action: AddColumnFromLibrary) => {
			return [
				new AddSlideToPresentation({ // dodaj slajd do dodanej kolumny w prezentacji
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.targetColumn.id, // docelowa kolumna dla slajdu
					},
				}),
				new RemoveSlideFromLibrary({ // usun slajd z biblioteki
					sourceSlideId: action.payload.sourceSlide.id,
				}),
			];
		}),
	);

	@Effect()
	public addSlideFromLibraryToExistingColumn$: Observable<AddSlideToPresentation | RemoveSlideFromLibrary> = this.actions$.pipe(
		ofType<AddSlideFromLibraryToExistingColumn>(ColumnActionsTypes.AddSlideFromLibraryToExistingColumn),
		switchMap((action: AddSlideFromLibraryToExistingColumn) => {
			return [
				new AddSlideToPresentation({ // dodaj slajd do dodanej kolumny w prezentacji
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.targetColumnId, // docelowa kolumna dla slajdu
					},
				}),
				new RemoveSlideFromLibrary({ // usun slajd z biblioteki
					sourceSlideId: action.payload.sourceSlide.id,
				}),
			];
		}),
	);

	constructor(
		private store: Store<AppState>,
		private actions$: Actions,
	) {
	}
}
