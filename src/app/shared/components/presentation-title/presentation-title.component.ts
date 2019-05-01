import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectEditorPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-metadata.selectors';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-presentation-title',
	templateUrl: './presentation-title.component.html',
	styleUrls: [ './presentation-title.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationTitleComponent implements OnInit {

	public presentationTitle$: EventEmitter<string> = new EventEmitter<string>();
	public presentationTitle: string;
	public dialogVisibility = true;
	public header: string;
	public isEditMode = false;

	constructor(
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.setHeader();
		this.setPresentationTitle();
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

	@HostListener('document:keydown.enter')
	public onSave(): void {
		if (this.presentationTitle && this.presentationTitle.length) {
			this.presentationTitle$.emit(this.presentationTitle);
			this.dialogVisibility = false;
		}
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.dialogVisibility = false;
	}
}
