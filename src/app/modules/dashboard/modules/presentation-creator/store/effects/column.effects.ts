import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddColumnFromAnotherColumn,
	AddColumnFromLibrary,
	AddSlideFromLibraryToExistingColumn,
	ColumnActionsTypes,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { map, switchMap } from 'rxjs/operators';
import {
	AddSlideToPresentation,
	UpdateSlideInPresentation,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { RemoveSlideFromLibrary } from 'src/app/modules/dashboard/store/actions/library.actions';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ColumnEffects {

	@Effect({ dispatch: true })
	public addColumnFromLibrary$: Observable<AddSlideToPresentation | RemoveSlideFromLibrary> = this.actions$.pipe(
		ofType<AddColumnFromLibrary>(ColumnActionsTypes.AddColumnFromLibrary),
		switchMap((action: AddColumnFromLibrary) => {
			return [
				new AddSlideToPresentation({ // dodaj slajd do nowo dodanej kolumny w prezentacji
					slide: {
						...action.payload.sourceSlide,
						position: 0,
						columnId: action.payload.column.id, // docelowa kolumna dla slajdu
					},
				}),
				new RemoveSlideFromLibrary({ // usun slajd z biblioteki
					sourceSlideId: action.payload.sourceSlide.id,
				}),
			];
		}),
	);

	@Effect({ dispatch: true })
	public addColumnFromAnotherColumn$ = this.actions$.pipe(
		ofType<AddColumnFromAnotherColumn>(ColumnActionsTypes.AddColumnFromAnotherColumn),
		map((action: AddColumnFromAnotherColumn) => {
			return new UpdateSlideInPresentation({ // przenies slajd do nowo dodanej kolumny w prezentacji
				slide: {
					id: action.payload.sourceSlideId,
					changes: {
						position: 0,
						columnId: action.payload.column.id,
					},
				},
			});
		}),
	);

	@Effect({ dispatch: true })
	public addSlideFromLibraryToExistingColumn$: Observable<AddSlideToPresentation | RemoveSlideFromLibrary> = this.actions$.pipe(
		ofType<AddSlideFromLibraryToExistingColumn>(ColumnActionsTypes.AddSlideFromLibraryToExistingColumn),
		switchMap((action: AddSlideFromLibraryToExistingColumn) => {
			return [
				new AddSlideToPresentation({ // dodaj slajd do dodanej kolumny w prezentacji
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.targetColumnId, // docelowa kolumna dla slajdu
						position: action.payload.slideNewPosition, // pozycja slajdu w docelowej kolumnie
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
