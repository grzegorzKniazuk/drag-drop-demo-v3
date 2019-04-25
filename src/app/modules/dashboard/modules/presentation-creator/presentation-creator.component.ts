import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { first } from 'rxjs/operators';
import { AddColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';

@Component({
	selector: 'app-presentation-creator',
	templateUrl: './presentation-creator.component.html',
	styleUrls: [ './presentation-creator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent extends DropZoneBase implements OnInit {

	constructor(
		private componentFactoryService: ComponentFactoryService,
		private viewContainerRef: ViewContainerRef,
		private store: Store<AppState>,
	) {
		super();
	}

	ngOnInit() {
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		const { slideId, columnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		console.log(slideId, columnId);
		this.componentFactoryService.createColumnTitleComponent(this.viewContainerRef).columnTitle$
		    .pipe(
			    first(),
		    )
		    .subscribe((columnTitle: string) => {
			    this.store.dispatch(new AddColumn({
				    column: {
				    	id: Math.floor((Math.random() * 10000000) + 1),
					    title: columnTitle,
					    slidesIds: [ slideId ],
				    },
				    sourceColumnId: columnId,
			    }));
		    });
	}
}
