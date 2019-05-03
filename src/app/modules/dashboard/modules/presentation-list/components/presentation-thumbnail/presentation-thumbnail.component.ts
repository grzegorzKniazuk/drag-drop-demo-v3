import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { filter, first } from 'rxjs/operators';
import { RemovePresentation } from 'src/app/modules/dashboard/modules/presentation-list/store/actions/presentation-list.actions';

@Component({
	selector: 'app-presentation-thumbnail',
	templateUrl: './presentation-thumbnail.component.html',
	styleUrls: [ './presentation-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent implements OnInit {

	@Input() presentation: Presentation;

	constructor(
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
	}

	public deletePresentation(): void {
		this.componentFactoryBaseService.createConfirmDialogComponent(
			'Uwaga',
			'Czy napewno chcesz usunąć tą prezentację? Operacji nie można cofnać'
		).onAcceptOrConfirm$.pipe(
			first(),
			filter((isAccepted) => isAccepted),
		).subscribe(() => {
			this.store.dispatch(new RemovePresentation({ presentationId: this.presentation.id }));
		});
	}

}
