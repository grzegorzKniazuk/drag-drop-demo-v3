import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddColumnBetweenExistingColumns,
	AddColumnBetweenExistingColumnsByLibrarySlide,
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
	MoveSlideBetweenColumns,
	MoveSlideToNewCreatedColumn,
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
				new AddSlideToPresentation({
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.column.id,
						position: 0,
					},
				}),
				new RemoveSlideFromLibrary({
					sourceSlideId: action.payload.sourceSlide.id,
				}),
			];
		}),
	);

	@Effect({ dispatch: true })
	public addColumnFromAnotherColumn$: Observable<MoveSlideToNewCreatedColumn> = this.actions$.pipe(
		ofType<AddColumnFromAnotherColumn>(ColumnActionsTypes.AddColumnFromAnotherColumn),
		map((action: AddColumnFromAnotherColumn) => {
			return new MoveSlideToNewCreatedColumn({
				slide: {
					id: action.payload.sourceSlideId,
					changes: {
						columnId: action.payload.column.id,
						position: 0,
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
				new AddSlideToPresentation({
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.targetColumnId,
						position: action.payload.targetSlidePosition,
					},
				}),
				new RemoveSlideFromLibrary({
					sourceSlideId: action.payload.sourceSlide.id,
				}),
			];
		}),
	);

	@Effect({ dispatch: true })
	public addColumnBetweenExistingColumns$: Observable<MoveSlideBetweenColumns> = this.actions$.pipe(
		ofType<AddColumnBetweenExistingColumns>(ColumnActionsTypes.AddColumnBetweenExistingColumns),
		map((action: AddColumnBetweenExistingColumns) => {
			return new MoveSlideBetweenColumns({
				slide: {
					id: action.payload.sourceSlide.id,
					changes: {
						columnId: action.payload.column.id,
						position: 0,
					},
				},
			});
		}),
	);

	@Effect({ dispatch: true })
	public addColumnBetweenExistingColumnsByLibrarySlide$: Observable<AddSlideToPresentation | RemoveSlideFromLibrary> = this.actions$.pipe(
		ofType<AddColumnBetweenExistingColumnsByLibrarySlide>(ColumnActionsTypes.AddColumnBetweenExistingColumnsByLibrarySlide),
		switchMap((action: AddColumnBetweenExistingColumnsByLibrarySlide) => {
			return [
				new AddSlideToPresentation({
					slide: {
						...action.payload.sourceSlide,
						columnId: action.payload.column.id,
						position: 0,
					},
				}),
				new RemoveSlideFromLibrary({
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
