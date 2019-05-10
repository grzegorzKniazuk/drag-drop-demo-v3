import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent extends BaseDynamicComponent implements OnInit {

	public readonly inputProps = [ 'message', 'header' ];
	public message: string;
	public header: string;

	constructor(
		private confirmationService: ConfirmationService,
	) {
		super();
	}

	ngOnInit() {
		this.buildConfirmDialog();
	}

	private buildConfirmDialog(): void {
		this.confirmationService.confirm({
			header: this.header,
			message: this.message,
			acceptLabel: 'Potwierdź',
			rejectLabel: 'Anuluj',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.onSaveAction.emit(true);
			},
			reject: () => {
				this.onCancelAction.emit(false);
			},
		});
	}

}
