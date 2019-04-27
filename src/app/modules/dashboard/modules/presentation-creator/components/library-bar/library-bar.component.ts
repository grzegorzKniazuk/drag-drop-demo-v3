import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { selectLibrarySlides, selectLibrarySlidesAmount } from 'src/app/modules/dashboard/store/selectors/library.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { Slide } from 'src/app/shared/interfaces/slide';

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
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.librarySlidesAmount$ = this.store.pipe(select(selectLibrarySlidesAmount));
		this.slidesInLibary$ = this.store.pipe(select(selectLibrarySlides));
	}

	ngOnDestroy() {
	}

	public clickIntoFileInput(): void {
		this.fileInputElement.nativeElement.click();
	}

	public uploadFiles(event: any): void {
		this.fileUploadService.uploadFiles(event);
	}

	public onDragLeave(): void {
		this.display = false;
	}

	@HostListener('document:keydown', [ '$event' ])
	public openSlider(event: KeyboardEvent | MouseEvent | any, onClick: boolean = false): void {
		if (event.key === 'ArrowUp' || onClick) {
			this.display = true;
		}
	}
}
