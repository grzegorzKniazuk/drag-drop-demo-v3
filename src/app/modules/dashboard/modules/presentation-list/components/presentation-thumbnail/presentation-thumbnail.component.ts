import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { filter, first, tap } from 'rxjs/operators';
import { RemovePresentation, UpdatePresentation } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';
import { Router } from '@angular/router';

@Component({
	selector: 'app-presentation-thumbnail',
	templateUrl: './presentation-thumbnail.component.html',
	styleUrls: [ './presentation-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent {

	@Input() presentation: Presentation;

	constructor(
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private store: Store<AppState>,
		private router: Router,
	) {
	}

	public updatePresentation(): void {
		this.store.dispatch(new UpdatePresentation({
			id: this.presentation.id,
			title: this.presentation.title,
			slides: this.presentation.slides,
			columns: this.presentation.columns,
		}));
	}

	public deletePresentation(): void {
		this.componentFactoryBaseService.createConfirmDialogComponent(
			'Uwaga',
			'Czy napewno chcesz usunąć tą prezentację? Operacji nie można cofnać',
		).onAcceptOrConfirm$.pipe(
			first(),
			filter((isAccepted) => isAccepted),
			tap(() => {
				this.componentFactoryBaseService.clearViewContainerRef();
			}),
		).subscribe(() => {
			this.store.dispatch(new RemovePresentation({ presentationId: this.presentation.id }));
		});
	}

	public showPresentation(): void {
		this.router.navigateByUrl(`/dashboard/presentation-viewer/${this.presentation.id}`);
	}
}
