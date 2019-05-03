import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectPresentationList } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/presentation-list.selectors';
import { first } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SetPresentationId, SetPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';
import { Router } from '@angular/router';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { Memoize } from 'lodash-decorators';

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
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.title.setTitle('Lista prezentacji');
		this.presentationList$ = this.store.pipe(select(selectPresentationList));
	}

	ngOnDestroy() {
	}

	public createNewPresentation(): void {
		this.componentFactoryBaseService.createPresentationTitleComponent().presentationTitle$
		    .pipe(first())
		    .subscribe((presentationTitle: string) => {
			    this.store.dispatch(new SetPresentationId({ presentationId: Math.floor((Math.random() * 10000000) + 1) }));
			    this.store.dispatch(new SetPresentationTitle({ presentationTitle }));
			    this.router.navigateByUrl('/dashboard/presentation-creator');
		    });
	}

	@Memoize
	public trackByPresentationId(index: number, presentation: Presentation): number {
		return presentation.id;
	}
}
