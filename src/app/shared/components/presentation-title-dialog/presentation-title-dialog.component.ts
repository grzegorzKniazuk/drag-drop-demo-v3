import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectEditorPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-metadata.selectors';
import { first } from 'rxjs/operators';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-title',
	templateUrl: './presentation-title-dialog.component.html',
	styleUrls: [ './presentation-title-dialog.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationTitleDialogComponent extends BaseDynamicComponent implements OnInit, OnDestroy {

	public presentationTitle: string;
	public dialogVisibility = true;
	public header: string;
	public isEditMode = false;

	constructor(
		private store: Store<AppState>,
	) {
		super();
	}

	ngOnInit() {
		this.setHeader();
		this.setPresentationTitle();
	}

	ngOnDestroy() {
	}

	@HostListener('document:keydown.enter')
	public onSave(): void {
		if (this.presentationTitle && this.presentationTitle.length) {
			this.dialogVisibility = false;
			this.onSaveAction.emit(this.presentationTitle);
		}
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.dialogVisibility = false;
		this.onCancelAction.emit();
	}

	private setPresentationTitle(): void {
		if (this.isEditMode) {
			this.store.pipe(
				select(selectEditorPresentationTitle),
				first(),
			).subscribe((presentationTitle: string) => {
				this.presentationTitle = presentationTitle;
			});
		}
	}

	private setHeader(): void {
		this.header = this.isEditMode ? 'Edytuj tytuł prezentacji' : 'Tytuł nowej prezentacji';
	}
}
