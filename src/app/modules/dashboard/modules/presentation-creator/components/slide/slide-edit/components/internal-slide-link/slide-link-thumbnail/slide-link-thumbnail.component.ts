import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { InternalSlideLinkService } from 'src/app/modules/dashboard/modules/presentation-creator/services/internal-slide-link.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { filter, tap } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide-link-thumbnail',
	templateUrl: './slide-link-thumbnail.component.html',
	styleUrls: [ './slide-link-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLinkThumbnailComponent implements OnInit, OnDestroy {

	@Input() public slide: Slide;
	public isSelected: boolean;

	constructor(
		private internalSlideLinkService: InternalSlideLinkService,
		private changeDetectorRef: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this.initObservables();
	}

	ngOnDestroy() {
	}

	private initObservables(): void {
		this.internalSlideLinkService.selectedSlideId$
		    .pipe(
			    tap(() => {
			    	this.isSelected = false;
			    	this.changeDetectorRef.detectChanges();
			    }),
			    filter((selectedSlideId: number) => {
			    	return selectedSlideId === this.slide.id;
			    }),
		    )
		    .subscribe(() => {
			    this.isSelected = true;
			    this.changeDetectorRef.detectChanges();
		    });
	}

	@HostListener('click')
	private selectSlide() {
		this.isSelected = !this.isSelected;
		this.internalSlideLinkService.selectedSlideId$.next(this.slide.id);
	}
}
