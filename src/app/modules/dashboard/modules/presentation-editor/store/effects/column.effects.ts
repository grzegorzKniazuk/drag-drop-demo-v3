import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
	AddColumnBetweenExistingColumns,
	AddColumnBetweenExistingColumnsByLibrarySlide,
	AddColumnFromAnotherColumn,
	AddColumnFromLibrary,
	AddSlideFromLibraryToExistingColumn,
	AddSlideToPresentation,
	ColumnActionsTypes,
	MoveSlideBetweenColumns,
	MoveSlideToNewCreatedColumn,
	RemoveColumn,
	RemoveSlidesByColumn,
} from 'src/app/modules/dashboard/modules/presentation-editor/store/actions';
import { map, tap } from 'rxjs/operators';
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
						position: {
							column: action.payload.column.position,
							order: 0,
						},
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
					slide: action.payload.sourceSlide,
				});
			},
		),
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
						position: {
							column: action.payload.column.position,
							order: 0,
						},
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
					position: {
						column: action.payload.column.position,
						order: 0,
					},
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
