import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { selectLibrarySlides, selectLibrarySlidesAmount } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { Slide } from 'src/app/shared/interfaces';
import { HideLibrarySlider } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';
import { selectIsLibrarySliderOpen } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-options.selectors';
import { first } from 'rxjs/operators';
import { ADD_SLIDES } from 'src/app/modules/dashboard/store/actions/library.actions';
import { demoSlide1, demoSlide2, demoSlide3, demoSlide4, demoSlide5 } from 'src/app/shared/utils/demo-slides';

@AutoUnsubscribe()
@Component({
	selector: 'app-library-bar',
	templateUrl: './library-bar.component.html',
	styleUrls: [ './library-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryBarComponent implements OnInit, OnDestroy {

	public display: boolean;
	public librarySlidesAmount$: Observable<number>;
	public slidesInLibary$: Observable<Slide[]>;
	@ViewChild('fileInputElement') protected readonly fileInputElement: ElementRef;

	constructor(
		private fileUploadService: FileUploadService,
		private changeDetectorRef: ChangeDetectorRef,
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.initObservables();
		this.initAndWatchSliderState();
		this.initDemoSlides();
	}

	ngOnDestroy() {
	}

	public clickIntoFileInput(): void {
		this.fileInputElement.nativeElement.click();
	}

	public uploadFiles(event: any): void {
		this.fileUploadService.uploadFiles(event);
	}

	@HostListener('dragleave')
	public hideSlider(): void {
		this.store.pipe(select(selectIsLibrarySliderOpen)).pipe(
			first(),
		).subscribe((isOpen: boolean) => {
			if (isOpen) {
				this.store.dispatch(new HideLibrarySlider());
			}
		});
	}

	private initObservables(): void {
		this.librarySlidesAmount$ = this.store.pipe(select(selectLibrarySlidesAmount));
		this.slidesInLibary$ = this.store.pipe(select(selectLibrarySlides));
	}

	private initAndWatchSliderState(): void {
		this.store.pipe(select(selectIsLibrarySliderOpen)).subscribe((isOpen: boolean) => {
			this.display = isOpen;
			this.changeDetectorRef.markForCheck();
		});
	}

	private initDemoSlides(): void {
		this.store.dispatch(new ADD_SLIDES({ slides: [ demoSlide1, demoSlide2, demoSlide3, demoSlide4, demoSlide5 ] }));
	}
}
