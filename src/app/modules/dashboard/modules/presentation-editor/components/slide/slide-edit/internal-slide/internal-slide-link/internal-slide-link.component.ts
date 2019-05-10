import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Slide } from 'src/app/shared/interfaces';
import { selectSlidesExceptOne } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { groupBy } from 'src/app/shared/utils/group-by';
import { first, map, tap } from 'rxjs/operators';
import { SelectedItemLinkService } from 'src/app/modules/dashboard/modules/presentation-editor/services/selected-item-link.service';
import { Observable } from 'rxjs';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@AutoUnsubscribe()
@Component({
	selector: 'app-internal-slide-link',
	templateUrl: './internal-slide-link.component.html',
	styleUrls: [ './internal-slide-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalSlideLinkComponent extends BaseDynamicComponent implements OnInit, OnDestroy {

	public readonly inputProps = [ 'editedSlideId', 'alreadySelectedSlideId' ];
	public sortedSlidesArrays: Slide[][] = [];
	public editedSlideId: number;
	public isVisible = true;
	public isSlideSelected$: Observable<boolean>;
	public alreadySelectedSlideId: number | string;

	constructor(
		private store: Store<AppState>,
		private selectedItemLinkService: SelectedItemLinkService,
	) {
		super();
	}

	ngOnInit() {
		this.initObservables();
		this.fetchEditorSlides();
	}

	ngOnDestroy() {
		this.selectedItemLinkService.selectedSlideId$.next(null);
	}

	public onSave(): void {
		this.selectedItemLinkService.selectedSlideId$.pipe(
			tap(() => this.isVisible = false),
			first(),
		).subscribe((selectedSlideId: number) => {
			this.onSaveAction.emit(selectedSlideId);
		});
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}

	private initObservables(): void {
		this.isSlideSelected$ = this.selectedItemLinkService.selectedSlideId$.pipe(
			map((slideSelectedId: number) => !!slideSelectedId));
	}

	private fetchEditorSlides(): void {
		this.store.pipe(
			select(selectSlidesExceptOne, { slideId: this.editedSlideId }),
			first(),
		).subscribe((slides: Slide[]) => {
			this.sortByColumns(groupBy(slides, 'columnId'));
		});
	}

	// https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
	private sortByColumns(columns: { [key: number]: Slide[] }): void {
		const sortedSlidesArrays = [];

		for (let slideArray of Object.values(columns)) {
			sortedSlidesArrays.splice(slideArray[0].position.column, 0, slideArray);
		}

		this.sortedSlidesArrays = sortedSlidesArrays;
	}
}
