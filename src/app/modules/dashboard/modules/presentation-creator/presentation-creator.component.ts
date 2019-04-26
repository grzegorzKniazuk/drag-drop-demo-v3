import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { SlideDataTransfer } from 'src/app/shared/interfaces/slide-data-transfer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { first } from 'rxjs/operators';
import { AddColumn } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/column.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Title } from '@angular/platform-browser';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-creator',
	templateUrl: './presentation-creator.component.html',
	styleUrls: [ './presentation-creator.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent extends DropZoneBase implements OnInit, OnDestroy {

	constructor(
		private componentFactoryService: ComponentFactoryService,
		private viewContainerRef: ViewContainerRef,
		private title: Title,
		private store: Store<AppState>,
	) {
		super();
	}

	ngOnInit() {
		this.title.setTitle('Kreator prezentacji');
	}

	ngOnDestroy() {
	}

	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		const { sourceSlideId, sourceColumnId }: SlideDataTransfer = JSON.parse(event.dataTransfer.getData('string'));

		console.log(sourceSlideId, sourceColumnId);
		this.componentFactoryService.createColumnTitleComponent(this.viewContainerRef).columnTitle$
		    .pipe(
			    first(),
		    )
		    .subscribe((columnTitle: string) => {
			    this.store.dispatch(new AddColumn({
				    targetColumn: {
				    	id: Math.floor((Math.random() * 10000000) + 1),
					    title: columnTitle,
					    slidesIds: [ sourceSlideId ],
				    },
				    sourceColumnId,
			    }));
		    });
	}
}
