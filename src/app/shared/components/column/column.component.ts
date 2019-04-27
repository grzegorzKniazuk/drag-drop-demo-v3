import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Column } from 'src/app/shared/interfaces/column';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { debounceTime, first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
	AddSlideFromLibraryToExistingColumn,
	UpdateColumn,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/shared/interfaces/slide';
import {
	selectColumnSlidesById,
	selectSlideFromColumnById,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { UpdateSlideInPresentation } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';

@AutoUnsubscribe()
@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: [ './column.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends DropZoneBase implements OnInit, OnDestroy {

	@Input() public column: Column;
	public columnSlides$: Observable<Slide[]>;
	public columnTitleForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<AppState>,
	) {
		super();
	}

	ngOnInit() {
		this.buildForm();
		this.watchFormChanges();

		this.columnSlides$ = this.store.pipe(select(selectColumnSlidesById, { columnId: this.column.id }));
	}

	ngOnDestroy() {
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();
		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceColumnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		if (sourceColumnId) {
			this.moveSlideFromColumnToColumn(sourceSlideId);
		} else {
			this.moveSlideFromLibraryToColumn(sourceSlideId);
		}
	}

	private buildForm(): void {
		this.columnTitleForm = this.formBuilder.group({
			columnTitle: [ this.column.title ],
		});
	}

	private watchFormChanges(): void {
		this.columnTitleForm.valueChanges.pipe(
			debounceTime(1500),
		).subscribe((changes: { columnTitle: string }) => {
			this.store.dispatch(new UpdateColumn({
				column: {
					id: this.column.id,
					changes: {
						title: changes.columnTitle,
					},
				},
			}));
		});
	}

	// jesli slajd jest przenoszony z innej kolumny
	private moveSlideFromColumnToColumn(sourceSlideId: number): void {
		this.store.dispatch(new UpdateSlideInPresentation({
			slide: {
				id: sourceSlideId,
				changes: {
					columnId: this.column.id,
				},
			},
		}));
	}

	// jesli slajd jest przenoszony z biblioteki
	private moveSlideFromLibraryToColumn(sourceSlideId: number): void {
		this.store.pipe(
			select(selectSlideFromLibraryById, { slideId: sourceSlideId }),
			first(),
		).subscribe((slideToMove: Slide) => {
			this.store.dispatch(new AddSlideFromLibraryToExistingColumn({
				sourceSlide: slideToMove,
				targetColumnId: this.column.id,
			}));
		});
	}
}
