import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectPresentationList } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/presentation-list.selectors';
import { PresentationListComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-list/services/presentation-list-component-factory.service';
import { filter, first } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-list',
	templateUrl: './presentation-list.component.html',
	styleUrls: [ './presentation-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationListComponent implements OnInit, OnDestroy {

	public presentationList$: Observable<Presentation[]>;

	constructor(
		private title: Title,
		private store: Store<AppState>,
		private presentationListComponentFactoryService: PresentationListComponentFactoryService,
	) {
	}

	ngOnInit() {
		this.title.setTitle('Lista prezentacji');
		this.presentationList$ = this.store.pipe(select(selectPresentationList));
	}

	ngOnDestroy() {
	}

	public createNewPresentation(): void {
		this.presentationListComponentFactoryService.createPresentationTitleComponent().presentationTitle$
		    .pipe(
			    first(),
			    filter((presentationTitle: string) => !!presentationTitle),
		    )
		    .subscribe((presentationTitle: string) => {
			    console.log(presentationTitle);
		    });
	}
}
