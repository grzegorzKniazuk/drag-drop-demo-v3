import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { selectSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { groupBy } from 'src/app/shared/utils/group-by';
import { first } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
	selector: 'app-internal-slide-link',
	templateUrl: './internal-slide-link.component.html',
	styleUrls: [ './internal-slide-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalSlideLinkComponent implements OnInit, OnDestroy {

	public slidesGroupedByColumn: Slide[][];
	public editedSlideId: number;
	public isVisible = true;

	constructor(
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.fetchEditorSlides();
	}

	ngOnDestroy() {
	}

	private fetchEditorSlides(): void {
		this.store.pipe(
			select(selectSlides),
			first(),
		).subscribe((slides: Slide[]) => {
			this.slidesGroupedByColumn = groupBy(slides, 'columnId');
			console.log(this.slidesGroupedByColumn);
		});
	}

	public onSave(): void {
		this.isVisible = false;
	}

	public onCancel(): void {
		this.isVisible = false;
	}
}
