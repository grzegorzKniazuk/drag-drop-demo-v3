import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: [ './confirm-dialog.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {

	public onAcceptOrConfirm$: EventEmitter<boolean> = new EventEmitter<boolean>();
	public message: string;
	public header: string;

	constructor(
		private confirmationService: ConfirmationService,
	) {
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
				this.onAcceptOrConfirm$.emit(true);
			},
			reject: () => {
				this.onAcceptOrConfirm$.emit(false);
			},
		});
	}

}
