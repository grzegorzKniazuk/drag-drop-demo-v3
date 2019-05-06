import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Slide } from 'src/app/shared/interfaces/slide';
import { demoSlide1 } from 'src/app/shared/utils/demo-slides';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Coordinates } from 'src/app/shared/interfaces/coordinates';
import { Rectangle } from 'src/app/shared/interfaces/rectangle';

@Component({
	selector: 'app-slide-edit',
	templateUrl: './slide-edit.component.html',
	styleUrls: [ './slide-edit.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditComponent implements OnInit, AfterViewInit {

	@ViewChild('canvasElement') private readonly canvasElement: ElementRef;
	@ViewChild('backgroundElement') private readonly backgroundElement: ElementRef;
	private context: CanvasRenderingContext2D;
	private slide: Slide;
	private startCords: Coordinates;
	private endCords: Coordinates;
	private readonly rectangles: Rectangle[] = [];

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

	ngAfterViewInit() {
		this.initCanvasContext();
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

	private initCanvasContext(): void {
		this.context = this.canvasElement.nativeElement.getContext('2d');
	}

	private setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string>imageData);
	}

	public onClick(event: MouseEvent): void {
		const { x, y } = this.getCursorPosition(event);

		this.rectangles.forEach((rectangle) => {
			if (rectangle.topLeft.x < x && rectangle.topRight.x > x && rectangle.topLeft.y < y && rectangle.bottomLeft.y > y) {
				console.log(rectangle);
			}
		});
	}

	public onMouseDown(event: MouseEvent): void {
		this.getCursorPosition(event);
		this.startCords = this.getCursorPosition(event);
	}

	public onMouseMove(event: MouseEvent): void {
		if (event.buttons) {
			if (this.startCords && this.endCords) {
				this.context.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
				this.rectangles.forEach((rectangle) => {
					this.drawRectangle(rectangle);
				});
			}
			this.endCords = this.getCursorPosition(event);
			this.draw();
		}
	}

	public onMouseUp(event: MouseEvent): void {
		this.endCords = this.getCursorPosition(event);

		const rectangle = {
			topLeft: {
				x: this.startCords.x,
				y: this.startCords.y,
			},
			topRight: {
				x: this.endCords.x,
				y: this.startCords.y,
			},
			bottomLeft: {
				x: this.startCords.x,
				y: this.endCords.y,
			},
			bottomRight: {
				x: this.endCords.x,
				y: this.endCords.y,
			},
		};

		this.rectangles.push(rectangle);

		this.startCords = null;
		this.endCords = null;

		this.context.clearRect(
			rectangle.topLeft.x + 1,
			rectangle.topLeft.y + 1,
			Math.abs(rectangle.topLeft.x - rectangle.topRight.x) - 1,
			Math.abs(rectangle.topRight.y - rectangle.bottomRight.y) - 1,
		);
	}

	private getCursorPosition(event: MouseEvent): Coordinates {
		const rect = this.canvasElement.nativeElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		return { x, y };
	}

	private draw(): void {
		this.context.beginPath();
		this.context.setLineDash([ 5, 5 ]);
		this.context.lineWidth = 2;
		this.context.strokeStyle = 'black';
		this.context.rect(this.startCords.x, this.startCords.y, this.endCords.x - this.startCords.x, this.endCords.y - this.startCords.y);
		this.context.stroke();
	}

	private drawRectangle(rectangle: Rectangle): void {
		this.context.beginPath();
		this.context.setLineDash([ 5, 5 ]);
		this.context.lineWidth = 2;
		this.context.strokeStyle = 'black';
		this.context.rect(rectangle.topLeft.x, rectangle.topLeft.y, Math.abs(rectangle.topLeft.x - rectangle.topRight.x), Math.abs(rectangle.topRight.y - rectangle.bottomRight.y));
		this.context.stroke();
	}
}
