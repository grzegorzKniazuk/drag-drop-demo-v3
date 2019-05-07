import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Slide } from 'src/app/shared/interfaces/slide';
import { demoSlide1 } from 'src/app/shared/utils/demo-slides';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Coordinates } from 'src/app/shared/interfaces/coordinates';

@Component({
	selector: 'app-slide-edit',
	templateUrl: './slide-edit.component.html',
	styleUrls: [ './slide-edit.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditComponent implements OnInit {

	@ViewChild('canvasElement') private readonly canvasElement: ElementRef;
	@ViewChild('backgroundElement') private readonly backgroundElement: ElementRef;
	private slide: Slide;
	private element: HTMLDivElement | null = null;
	private startCords: Coordinates;
	private endCords: Coordinates;

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private title: Title,
		private renderer2: Renderer2,
		private toastService: ToastService,
	) {
	}

	ngOnInit() {
		this.initTitle();
		this.fetchSlide();
		this.showOpeningToast();
	}

	private initTitle(): void {
		this.title.setTitle('Edycja slajdu');
	}

	private fetchSlide(): void {
		const slideId = +this.activatedRoute.snapshot.paramMap.get('id');

		this.slide = demoSlide1;
		this.setBackgroundImage(this.slide.imageData);
		/*
		this.store.pipe(
			select(selectSlidesById, { slideId }),
			first(),
		).subscribe((slide: Slide) => {
			this.slide = slide;
			this.setBackgroundImage(this.slide.imageData);
		});
		*/
	}

	private showOpeningToast(): void {
		this.toastService.information('Zaznacz obszar na slajdzie aby dodać do niego akcję');
	}

	private setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string>imageData);
	}

	public onClick(event: MouseEvent): void {
		this.startCords = this.getCursorPosition(event);

		if (this.element !== null) {
			this.element = null;
			this.renderer2.setStyle(this.canvasElement.nativeElement, 'cursor', 'default');
		} else {
			this.element = this.renderer2.createElement('div');
			this.renderer2.addClass(this.element, 'rectangle');
			this.renderer2.setStyle(this.element, 'left', `${this.startCords.x}%`);
			this.renderer2.setStyle(this.element, 'top', `${this.startCords.y}%`);
			this.renderer2.appendChild(this.canvasElement.nativeElement, this.element);

			this.renderer2.setStyle(this.canvasElement.nativeElement, 'cursor', 'crosshair');
		}
	}

	public onMouseMove(event: MouseEvent): void {
		this.endCords = this.getCursorPosition(event);

		if (this.element) {
			this.element.style.width = Math.abs(this.endCords.x - this.startCords.x) + '%';
			this.element.style.height = Math.abs(this.endCords.y - this.startCords.y) + '%';
			this.element.style.left = (this.endCords.x - this.startCords.x < 0) ? this.endCords.x + '%' : this.startCords.x + '%';
			this.element.style.top = (this.endCords.y - this.startCords.y < 0) ? this.endCords.y + '%' : this.startCords.y + '%';
		}
	}

	private getCursorPosition(event: MouseEvent): Coordinates {
		const rect = this.canvasElement.nativeElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		return { x: this.toPrecentageX(x), y: this.toPrecentageY(y) };
	}

	private toPrecentageX(x: number): number {
		return (x / this.canvasElement.nativeElement.offsetWidth) * 100;
	}

	private toPrecentageY(y: number): number {
		return (y / this.canvasElement.nativeElement.offsetHeight) * 100;
	}
}
