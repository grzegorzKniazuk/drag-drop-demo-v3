import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Presentation } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { REMOVE_PRESENTATION, UPDATE_PRESENTATION } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-presentation-thumbnail',
	templateUrl: './presentation-thumbnail.component.html',
	styleUrls: [ './presentation-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent implements OnDestroy {

	@Input() presentation: Presentation;

	constructor(
		private componentFactoryBaseService: ComponentFactoryService,
		private store: Store<AppState>,
		private router: Router,
	) {
	}

	ngOnDestroy() {
	}

	public updatePresentation(): void {
		this.store.dispatch(new UPDATE_PRESENTATION({
			id: this.presentation.id,
			title: this.presentation.title,
			slides: this.presentation.slides,
			columns: this.presentation.columns,
		}));
	}

	public deletePresentation(): void {
		this.componentFactoryBaseService.createDynamicComponent<boolean>(
			ConfirmDialogComponent,
			{
				header: 'Uwaga',
				message: 'Czy napewno chcesz usunąć tą prezentację? Operacji nie można cofnać',
			})
		    .subscribe(() => {
			    this.store.dispatch(new REMOVE_PRESENTATION({ presentationId: this.presentation.id }));
		    });
	}

	public showPresentation(): void {
		this.router.navigateByUrl(`/dashboard/presentation-viewer/${this.presentation.id}`);
	}
}
