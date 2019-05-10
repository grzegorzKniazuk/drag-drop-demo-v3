import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Presentation } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { SelectedItemLinkService } from 'src/app/modules/dashboard/modules/presentation-editor/services/selected-item-link.service';
import { filter, tap } from 'rxjs/operators';

@Component({
	selector: 'app-presentation-link-thumbnail',
	templateUrl: './presentation-link-thumbnail.component.html',
	styleUrls: [ './presentation-link-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationLinkThumbnailComponent implements OnInit {

	@Input() public presentation: Partial<Presentation>;
	@Input() public isSelected: boolean;
	private subscriptions$: Subscription = new Subscription();

	constructor(
		private internalSlideLinkService: SelectedItemLinkService,
		private changeDetectorRef: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this.initObservables();
	}

	ngOnDestroy() {
		this.subscriptions$.unsubscribe();
	}

	private initObservables(): void {
		this.subscriptions$.add(
			this.internalSlideLinkService.selectedPresentationId$.pipe(
				    filter((selectedPresentationId: number) => !!selectedPresentationId),
				    tap(() => {
					    this.isSelected = false;
					    this.changeDetectorRef.detectChanges();
				    }),
				    filter((selectedPresentationId: number) => selectedPresentationId === this.presentation.id ),
			    ).subscribe(() => {
				    this.isSelected = true;
				    this.changeDetectorRef.detectChanges();
			    }),
		);
	}

	@HostListener('click')
	private selectPresentation() {
		this.isSelected = !this.isSelected;
		this.internalSlideLinkService.selectedPresentationId$.next(this.presentation.id);
	}

}
