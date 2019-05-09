import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { first } from 'rxjs/operators';
import { Presentation } from 'src/app/shared/interfaces/presentation';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SlidePosition } from 'src/app/shared/interfaces/slide-position';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Memoize } from 'lodash-decorators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Title } from '@angular/platform-browser';
import { SlideActionParams } from 'src/app/shared/interfaces/slide-action-params';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';

@Component({
	selector: 'app-presentation-viewer',
	templateUrl: './presentation-viewer.component.html',
	styleUrls: [ './presentation-viewer.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationViewerComponent implements OnInit, AfterViewInit {

	public readonly slideLinkActionContainerCssClass = 'slide-link-action-container';
	public viewerPosition = { column: 0, order: 0 };
	public currentlyVisibleSlide: Slide;
	public presentation: Presentation;
	@ViewChild('backgroundElement') private backgroundElement: ElementRef;

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private localStorage: LocalStorage,
		private changeDetectorRef: ChangeDetectorRef,
		private renderer2: Renderer2,
		private toastService: ToastService,
		private title: Title,
	) {
	}

	public get isArrowUpAvailable(): boolean {
		return !!this.findSlideByPosition({ column: this.viewerPosition.column, order: this.viewerPosition.order - 1 });
	}

	public get isArrowRightAvailable(): boolean {
		return !!this.findSlideByPosition({ column: this.viewerPosition.column + 1, order: this.viewerPosition.order });
	}

	public get isArrowDownAvailable(): boolean {
		return !!this.findSlideByPosition({ column: this.viewerPosition.column, order: this.viewerPosition.order + 1 });
	}

	public get isArrowLeftAvailable(): boolean {
		return !!this.findSlideByPosition({ column: this.viewerPosition.column - 1, order: this.viewerPosition.order });
	}

	ngOnInit() {
		this.initTitle();
		this.showOpeningToast();
	}

	ngAfterViewInit() {
		this.fetchPresentation();
	}

	@HostListener('document:keydown.arrowup')
	public switchSlideToTop(): void {
		if (this.isArrowUpAvailable) {
			this.switchSlide({ column: this.viewerPosition.column, order: this.viewerPosition.order - 1 });
		}
	}

	@HostListener('document:keydown.arrowright')
	public switchSlideToRight(): void {
		if (this.isArrowRightAvailable) {
			this.switchSlide({ column: this.viewerPosition.column + 1, order: this.viewerPosition.order });
		}
	}

	@HostListener('document:keydown.arrowdown')
	public switchSlideToBottom(): void {
		if (this.isArrowDownAvailable) {
			this.switchSlide({ column: this.viewerPosition.column, order: this.viewerPosition.order + 1 });
		}
	}

	@HostListener('document:keydown.arrowleft')
	public switchSlideToLeft(): void {
		if (this.isArrowLeftAvailable) {
			this.switchSlide({ column: this.viewerPosition.column - 1, order: this.viewerPosition.order });
		}
	}

	public performAction(params: SlideActionParams): void {
		switch (params.type) {
			case SlideActionTypes.INTERNAL_SLIDE_LINK: {
				const targetSlidePosition = this.presentation.slides.find((slide: Slide) => {
					return slide.id === params.target;
				}).position;
				this.switchSlide(targetSlidePosition);
				break;
			}
			case SlideActionTypes.EXTERNAL_PRESENTATION_LINK: {

				break;
			}
			case SlideActionTypes.EXTERNAL_WEB_LINK: {

				break;
			}
			default: {
				this.toastService.error('Błąd parametrów akcji');
			}
		}
	}

	private initTitle(): void {
		this.title.setTitle('Przeglądarka prezentacji');
	}

	private showOpeningToast(): void {
		this.toastService.information('Poruszać się po prezentacji możesz również za pomocą strzałek na klawiaturze :)');
	}

	private fetchPresentation(): void {
		const presentationId = +this.activatedRoute.snapshot.paramMap.get('id');

		this.localStorage.getItem('presentation').pipe(
			first(),
		).subscribe((presentation: Presentation) => {
			this.presentation = presentation;
			this.initPresentation();
		});

		/*
		this.store.pipe(
			select(selectPresentationById, { id: presentationId }),
			first(),
		).subscribe((presentation: Presentation) => {
			this.presentation = presentation;
			this.initPresentation();
		});
		*/
	}

	private initPresentation(): void {
		this.currentlyVisibleSlide = this.findSlideByPosition(this.viewerPosition);
		this.setBackgroundImage(this.currentlyVisibleSlide.imageData);
	};

	private setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string>imageData);
		this.changeDetectorRef.detectChanges();
	}

	@Memoize
	private findSlideByPosition(position: SlidePosition): Slide {
		return this.presentation.slides.find((slide: Slide) => {
			return slide.position.column === position.column && slide.position.order === position.order;
		});
	}

	private switchSlide(params: SlidePosition): void {
		this.viewerPosition = params;
		this.currentlyVisibleSlide = this.findSlideByPosition(params);
		this.setBackgroundImage(this.currentlyVisibleSlide.imageData);
	}
}
