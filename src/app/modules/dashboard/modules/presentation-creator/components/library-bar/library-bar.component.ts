import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { selectLibrarySlides, selectLibrarySlidesAmount } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { Slide } from 'src/app/shared/interfaces/slide';
import { HideLibrarySlider } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';
import { selectIsLibrarySliderOpen } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-options.selectors';
import { first } from 'rxjs/operators';

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
	@ViewChild('fileInputElement') protected fileInputElement: ElementRef;

	constructor(
		private fileUploadService: FileUploadService,
		private changeDetectorRef: ChangeDetectorRef,
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.librarySlidesAmount$ = this.store.pipe(select(selectLibrarySlidesAmount));
		this.slidesInLibary$ = this.store.pipe(select(selectLibrarySlides));

		this.store.pipe(select(selectIsLibrarySliderOpen)).subscribe((isOpen: boolean) => {
			this.display = isOpen;
			this.changeDetectorRef.markForCheck();
		});
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
}
