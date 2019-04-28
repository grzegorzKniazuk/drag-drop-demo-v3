import { ChangeDetectionStrategy, Component, Input, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ColumnDividerSibilings } from 'src/app/shared/interfaces/column-divider-sibilings';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { isNull, isNumber } from 'lodash';
import { AddColumnBetweenExistingColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { first, withLatestFrom } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { selectSlidesById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { Slide } from 'src/app/shared/interfaces/slide';

@AutoUnsubscribe()
@Component({
	selector: 'app-column-divider',
	templateUrl: './column-divider.component.html',
	styleUrls: [ './column-divider.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDividerComponent extends DropZoneBase implements OnInit, OnDestroy {

	@Input() columnDividerSibilings: ColumnDividerSibilings; // {leftSideColumnPosition: 0, rightSideColumnPosition: 1}
	@Input() numberOfColumns: number; // 2

	constructor(
		private componentFactoryService: ComponentFactoryService,
		private viewContainerRef: ViewContainerRef,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	ngOnInit() {
		console.log(this.columnDividerSibilings);
		console.log(this.numberOfColumns);
	}

	ngOnDestroy() {
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceSlidePosition, sourceColumnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		if (isNumber(sourceColumnId)) { // slajd z prezentacji
			this.addColumnBetweenExistingColumns(sourceSlideId);
		} else if (isNull(sourceColumnId)) { // slajd z biblioteki

		}
	}

	private addColumnBetweenExistingColumns(sourceSlideId: number): void {
		this.componentFactoryService.createColumnTitleComponent(this.viewContainerRef).columnTitle$.pipe(
			first(),
			withLatestFrom(this.store.pipe(select(selectSlidesById, { slideId: sourceSlideId }))),
		).subscribe(([ columnTitle, sourceSlide ]: [ string, Slide ]) => {
			this.store.dispatch(new AddColumnBetweenExistingColumns({
				column: {
					id: Math.floor((Math.random() * 10000000) + 1),
					position: this.columnDividerSibilings.rightSideColumnPosition,
					title: columnTitle,
				},
				sourceSlide,
			}));
		});
	}
}
