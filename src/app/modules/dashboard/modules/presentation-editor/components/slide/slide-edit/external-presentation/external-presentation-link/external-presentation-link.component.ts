import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SelectedItemLinkService } from 'src/app/modules/dashboard/modules/presentation-editor/services/selected-item-link.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { selectPresentationsExceptOne } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/presentation-list.selectors';
import { Presentation } from 'src/app/shared/interfaces';
import { Partial } from 'lodash-decorators';

@AutoUnsubscribe()
@Component({
	selector: 'app-external-presentation-link',
	templateUrl: './external-presentation-link.component.html',
	styleUrls: [ './external-presentation-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalPresentationLinkComponent extends BaseDynamicComponent implements OnInit, OnDestroy {

	public readonly inputProps = [ 'editedPresentationId', 'alreadySelectedPresenationId' ];
	public editedPresentationId: number;
	public alreadySelectedPresenationId: number;
	public isPresentationSelected$: Observable<boolean>;
	public readonly presentations: Partial<Presentation>[] = [];
	public isVisible = true;

	constructor(
		private store: Store<AppState>,
		private selectedItemLinkService: SelectedItemLinkService,
	) {
		super();
	}

	ngOnInit() {
		this.initObservables();
		this.fetchPresentations();
	}

	ngOnDestroy() {
		this.selectedItemLinkService.selectedPresentationId$.next(null);
	}

	public onSave(): void {
		this.selectedItemLinkService.selectedPresentationId$.pipe(
			tap(() => this.isVisible = false),
			first(),
		).subscribe((selectedPresentationId: number) => {
			this.onSaveAction.emit(selectedPresentationId);
		});
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}

	private initObservables(): void {
		this.isPresentationSelected$ = this.selectedItemLinkService.selectedPresentationId$.pipe(
			map((selectedPresentationId: number) => !!selectedPresentationId));
	}

	private fetchPresentations(): void {
		this.store.pipe(
			select(selectPresentationsExceptOne, { presentationId: this.editedPresentationId }),
			first(),
		).subscribe((presentations: Presentation[]) => {
			this.presentations.push(...this.preparePresentations(presentations));
		});
	}

	private preparePresentations(presentations: Presentation[]): Partial<Presentation>[] {
		return presentations.map((presentation: Presentation) => {
			return {
				id: presentation.id,
				thumbnail: presentation.thumbnail,
			};
		});
	}
}
