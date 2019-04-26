import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Column } from 'src/app/shared/interfaces/column';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UpdateColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';

@AutoUnsubscribe()
@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: [ './column.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends DropZoneBase implements OnInit, OnDestroy {

	@Input() public column: Column;
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
	}

	ngOnDestroy() {
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

	public onDrop(event: DragEvent): void {

	}

}
