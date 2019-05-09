import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectAmountOfPresentations, selectPresentationList } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/presentation-list.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SetPresentationId, SetPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';
import { Router } from '@angular/router';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-list',
	templateUrl: './presentation-list.component.html',
	styleUrls: [ './presentation-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationListComponent implements OnInit, OnDestroy {

	public presentationList$: Observable<Presentation[]>;
	public amountOfPresentations$: Observable<number>;

	constructor(
		private title: Title,
		private store: Store<AppState>,
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private router: Router,
	) {
	}

	private get generatePresentationId(): number {
		return Math.floor((Math.random() * 10000000) + 1);
	}

	ngOnInit() {
		this.initTitle();
		this.initObserbables();
	}

	ngOnDestroy() {
	}

	public createNewPresentation(): void {
		const presentationId = this.generatePresentationId;
		this.componentFactoryBaseService.createPresentationTitleComponent(false)
		    .subscribe((presentationTitle: string) => {
			    this.router.navigateByUrl(`/dashboard/presentation-creator`).then(() => {
				    this.store.dispatch(new SetPresentationId({ presentationId }));
				    this.store.dispatch(new SetPresentationTitle({ presentationTitle }));
			    });
		    });
	}

	private initTitle(): void {
		this.title.setTitle('Lista prezentacji');
	}

	private initObserbables(): void {
		this.presentationList$ = this.store.pipe(select(selectPresentationList));
		this.amountOfPresentations$ = this.store.pipe(select(selectAmountOfPresentations));
	}
}
