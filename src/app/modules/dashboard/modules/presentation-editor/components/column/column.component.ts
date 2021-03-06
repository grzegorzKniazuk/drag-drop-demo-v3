import { ChangeDetectionStrategy, Component, HostListener, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Column, Slide } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { debounceTime, first, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { MoveSlideBetweenColumns, RemoveColumn, UpdateColumnsPosition, UpdateColumnTitle } from 'src/app/modules/dashboard/modules/presentation-editor/store/actions';
import { Observable } from 'rxjs';
import { selectAmountOfSlidesInColumnById, selectColumnSlidesById, selectColumnSlidesIdsByColumnId } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: [ './column.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends DropZoneBase implements OnInit, OnChanges, OnDestroy {

	@Input() public column: Column;
	@Input() public position: number;
	public columnSlides$: Observable<Slide[]>;
	public columnTitleForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private componentFactoryBaseService: ComponentFactoryService,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		this.buildForm();
		this.watchFormChanges();
		this.initColumnSlides();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.column.position !== this.position) {
			this.store.dispatch(new UpdateColumnsPosition({
				column: {
					id: this.column.id,
					changes: {
						position: this.position,
					},
				},
			}));
		}
	}

	ngOnDestroy() {
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();
		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		if (sourceColumnId) {
			this.moveSlideFromColumnToColumn(sourceSlideId);
		} else {
			this.moveSlideFromLibraryToColumn(sourceSlideId, this.column.id);
		}
	}

	public onRemoveColumn(): void {
		this.componentFactoryBaseService.createDynamicComponent<boolean>(
			ConfirmDialogComponent,
			{
				header: 'Uwaga',
				message: 'Czy na pewno chcesz usunąć tą sekcję prezentacji?',
			})
		    .pipe(withLatestFrom(this.store.pipe(select(selectColumnSlidesIdsByColumnId, { columnId: this.column.id }))))
		    .subscribe(([ accepted, slideIds ]: [ boolean, number[] ]) => {
			    this.store.dispatch(new RemoveColumn({
				    columnId: this.column.id,
				    columnSlidesIds: slideIds,
			    }));
		    });
	}

	private initColumnSlides(): void {
		this.columnSlides$ = this.store.pipe(select(selectColumnSlidesById, { columnId: this.column.id }));
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
			this.store.dispatch(new UpdateColumnTitle({
				targetColumn: {
					id: this.column.id,
					changes: {
						title: changes.columnTitle,
					},
				},
			}));
		});
	}

	private moveSlideFromColumnToColumn(sourceSlideId: number): void {
		this.store.pipe(
			select(selectAmountOfSlidesInColumnById, { columnId: this.column.id }),
			first(),
		).subscribe((amountOfSlidesInExsistingColumn: number) => {
			this.store.dispatch(new MoveSlideBetweenColumns({
				slide: {
					id: sourceSlideId,
					changes: {
						columnId: this.column.id,
						position: {
							column: this.column.position,
							order: amountOfSlidesInExsistingColumn,
						},
					},
				},
			}));
		});
	}
}
