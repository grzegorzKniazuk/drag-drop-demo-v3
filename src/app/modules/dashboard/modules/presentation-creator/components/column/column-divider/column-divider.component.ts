import { ChangeDetectionStrategy, Component, HostListener, Input, NgZone, OnDestroy } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { isNull, isNumber } from 'lodash';
import { AddColumnBetweenExistingColumns, AddColumnBetweenExistingColumnsByLibrarySlide } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions';
import { withLatestFrom } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { selectSlidesById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors';
import { selectSlideFromLibraryById } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { Column, ColumnDividerSibilings, Slide } from 'src/app/shared/interfaces';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';

@AutoUnsubscribe()
@Component({
	selector: 'app-column-divider',
	templateUrl: './column-divider.component.html',
	styleUrls: [ './column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDividerComponent extends DropZoneBase implements OnDestroy {

	@Input() columnDividerSibilings: ColumnDividerSibilings;
	@Input() numberOfColumns: number;

	constructor(
		private componentFactoryService: ComponentFactoryService,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnDestroy() {
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		if (isNumber(sourceColumnId)) { // slajd z prezentacji
			this.addColumnBetweenExistingColumns(sourceSlideId);
		} else if (isNull(sourceColumnId)) { // slajd z biblioteki
			this.addColumnBetweenExistingColumnsByLibrarySlide(sourceSlideId);
		}
	}

	private addColumnBetweenExistingColumns(sourceSlideId: number): void {
		this.componentFactoryService.createDynamicComponent<string>(ColumnTitleComponent)
		    .pipe(withLatestFrom(this.store.pipe(select(selectSlidesById, { slideId: sourceSlideId }))))
		    .subscribe(([ columnTitle, sourceSlide ]: [ string, Slide ]) => {
			    this.store.dispatch(new AddColumnBetweenExistingColumns({
				    column: this.prepareNewColumn(columnTitle),
				    sourceSlide,
			    }));
		    });
	}

	private addColumnBetweenExistingColumnsByLibrarySlide(sourceSlideId: number): void {
		this.componentFactoryService.createDynamicComponent<string>(ColumnTitleComponent)
		    .pipe(withLatestFrom(this.store.pipe(select(selectSlideFromLibraryById, { slideId: sourceSlideId }))))
		    .subscribe(([ columnTitle, sourceSlide ]: [ string, Slide ]) => {
			    this.store.dispatch(new AddColumnBetweenExistingColumnsByLibrarySlide({
				    column: this.prepareNewColumn(columnTitle),
				    sourceSlide: {
					    ...sourceSlide,
					    id: this.generateSlideId,
				    },
			    }));
		    });
	}

	private prepareNewColumn(columnTitle: string): Column {
		return {
			id: this.generateSlideId,
			position: this.columnDividerSibilings.rightSideColumnPosition,
			title: columnTitle,
		};
	}
}
