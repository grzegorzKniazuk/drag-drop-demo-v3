import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Slide } from 'src/app/shared/interfaces';
import { selectSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { groupBy } from 'src/app/shared/utils/group-by';
import { first, map, tap } from 'rxjs/operators';
import { InternalSlideLinkService } from 'src/app/modules/dashboard/modules/presentation-creator/services/internal-slide-link.service';
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
	public sortedSlidesArrays: Slide[][];
	public editedSlideId: number;
	public isVisible = true;
	public isSlideSelected$: Observable<boolean>;
	public alreadySelectedSlideId: number | string;

	constructor(
		private store: Store<AppState>,
		private internalSlideLinkService: InternalSlideLinkService,
	) {
		super();
	}

	ngOnInit() {
		this.initObservables();
		this.fetchEditorSlides();
	}

	ngOnDestroy() {
		this.internalSlideLinkService.selectedSlideId$.next(null);
	}

	public onSave(): void {
		this.internalSlideLinkService.selectedSlideId$
		    .pipe(
			    tap(() => {
				    this.isVisible = false;
			    }),
			    first(),
		    ).subscribe((selectedSlideId: number) => {
			this.onSaveAction.emit(selectedSlideId);
		});
	}

	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}

	private initObservables(): void {
		this.isSlideSelected$ = this.internalSlideLinkService.selectedSlideId$.pipe(
			map((slideSelectedId: number) => {
				return !!slideSelectedId;
			}),
		);
	}

	private fetchEditorSlides(): void {
		this.store.pipe(
			select(selectSlides),
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
