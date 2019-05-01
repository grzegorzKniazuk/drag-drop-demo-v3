import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
	SetEditorReadyToSave,
	ShowLibrarySlider,
} from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';
import { combineLatest, Observable } from 'rxjs';
import { selectEditorPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-metadata.selectors';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { first, tap } from 'rxjs/operators';
import { SetPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-metadata.actions';
import { SavePresentation } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { selectCreatorMetadataState } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/module-base.selectors';
import { selectSlides } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { selectColumns } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/column.selectors';
import { CreatorMetadata } from 'src/app/shared/interfaces/creator-metadata';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Column } from 'src/app/shared/interfaces/column';

@AutoUnsubscribe()
@Component({
	selector: 'app-menu-bar',
	templateUrl: './menu-bar.component.html',
	styleUrls: [ './menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit, OnDestroy {

	public presentationTitle$: Observable<string>;
	public menuItems: MenuItem[] = [];

	constructor(
		private store: Store<AppState>,
		private componentFactoryBaseService: ComponentFactoryBaseService,
	) {
	}

	ngOnInit() {
		this.buildMenu();
		this.initObservables();
	}

	ngOnDestroy() {
	}

	public openSlider(): void {
		this.store.dispatch(new ShowLibrarySlider());
	}

	public changePresentationTitle(): void {
		this.componentFactoryBaseService.createEditPresentationTitleComponent().presentationTitle$
		    .pipe(first())
		    .subscribe((presentationTitle: string) => {
			    this.store.dispatch(new SetPresentationTitle({ presentationTitle }));
		    });
	}

	private buildMenu(): void {
		this.menuItems = [];
	}

	private initObservables(): void {
		this.presentationTitle$ = this.store.pipe(select(selectEditorPresentationTitle));
	}

	public savePresentation(): void {
		combineLatest(
			this.store.pipe(select(selectCreatorMetadataState)),
			this.store.pipe(select(selectSlides)),
			this.store.pipe(select(selectColumns)),
		)
		.pipe(
			first(),
			tap(() => {
				this.store.dispatch(new SetEditorReadyToSave());
			}),
		)
		.subscribe(([ metadata, slides, columns ]: [ CreatorMetadata, Slide[], Column[] ]) => {
			this.store.dispatch(new SavePresentation({
				presentation: {
					id: metadata.presentationId,
					title: metadata.presentationTitle,
					thumbnail: slides[0].imageData,
					slides,
					columns,
				},
			}));
		});
	}
}
