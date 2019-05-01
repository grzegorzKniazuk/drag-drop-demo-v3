import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddColumnBetweenExistingColumns,
	AddColumnBetweenExistingColumnsByLibrarySlide,
	AddColumnFromAnotherColumn,
	AddColumnFromLibrary,
	AddSlideFromLibraryToExistingColumn,
	ColumnActionsTypes,
	RemoveColumn,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { map, tap } from 'rxjs/operators';
import {
	AddSlideToPresentation,
	MoveSlideBetweenColumns,
	MoveSlideToNewCreatedColumn,
	RemoveSlidesByColumn,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
	providedIn: 'root',
})
export class ColumnEffects {

	@Effect({ dispatch: true })
	public addColumnFromLibrary$: Observable<AddSlideToPresentation> = this.actions$.pipe(
		ofType<AddColumnFromLibrary>(ColumnActionsTypes.AddColumnFromLibrary),
		map((action: AddColumnFromLibrary) => {
			return new AddSlideToPresentation({
				slide: {
					...action.payload.sourceSlide,
					columnId: action.payload.column.id,
					position: 0,
				},
			});
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
	public addSlideFromLibraryToExistingColumn$: Observable<AddSlideToPresentation> = this.actions$.pipe(
		ofType<AddSlideFromLibraryToExistingColumn>(ColumnActionsTypes.AddSlideFromLibraryToExistingColumn),
		map((action: AddSlideFromLibraryToExistingColumn) => {
			return new AddSlideToPresentation({
				slide: {
					...action.payload.sourceSlide,
					columnId: action.payload.targetColumnId,
					position: action.payload.targetSlidePosition,
				},
			});
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
	public addColumnBetweenExistingColumnsByLibrarySlide$: Observable<AddSlideToPresentation> = this.actions$.pipe(
		ofType<AddColumnBetweenExistingColumnsByLibrarySlide>(ColumnActionsTypes.AddColumnBetweenExistingColumnsByLibrarySlide),
		map((action: AddColumnBetweenExistingColumnsByLibrarySlide) => {
			return new AddSlideToPresentation({
				slide: {
					...action.payload.sourceSlide,
					columnId: action.payload.column.id,
					position: 0,
				},
			});
		}),
	);

	@Effect({ dispatch: true })
	public removeColumn$ = this.actions$.pipe(
		ofType<RemoveColumn>(ColumnActionsTypes.RemoveColumn),
		map((action: RemoveColumn) => {
			return new RemoveSlidesByColumn({
				slideIds: action.payload.columnSlidesIds,
			});
		}),
		tap(() => {
			this.toastService.success('Usunięto sekcję');
		}),
	);

	constructor(
		private toastService: ToastService,
		private actions$: Actions,
	) {
	}
}
