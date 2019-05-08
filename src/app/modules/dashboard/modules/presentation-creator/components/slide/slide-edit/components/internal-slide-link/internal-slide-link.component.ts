import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { selectSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { groupBy } from 'src/app/shared/utils/group-by';
import { first, map, tap } from 'rxjs/operators';
import { InternalSlideLinkService } from 'src/app/modules/dashboard/modules/presentation-creator/services/internal-slide-link.service';
import { Observable } from 'rxjs';

@AutoUnsubscribe()
@Component({
	selector: 'app-internal-slide-link',
	templateUrl: './internal-slide-link.component.html',
	styleUrls: [ './internal-slide-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalSlideLinkComponent implements OnInit, OnDestroy {

	public onSaveAction: EventEmitter<number> = new EventEmitter<number>();
	public slidesGroupedByColumn: Slide[][];
	public editedSlideId: number;
	public isVisible = true;
	public isSlideSelected$: Observable<boolean>;

	constructor(
		private store: Store<AppState>,
		private internalSlideLinkService: InternalSlideLinkService,
	) {
	}

	ngOnInit() {
		this.initObservables();
		this.fetchEditorSlides();
	}

	ngOnDestroy() {
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
			this.slidesGroupedByColumn = groupBy(slides, 'columnId');
		});
	}
}
