import { Coordinates } from 'src/app/shared/interfaces/coordinates';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';
import { ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Title } from '@angular/platform-browser';

export abstract class DrawZoneBase {

	public readonly slideLinkActionContainerCssClass = 'slide-link-action-container';
	@ViewChild('canvasElement') protected readonly canvasElement: ElementRef;
	@ViewChild('backgroundElement') protected readonly backgroundElement: ElementRef;
	protected element: HTMLDivElement | null = null;
	protected startCords: Coordinates = { x: 0, y: 0 };
	protected endCords: Coordinates = { x: 0, y: 0 };

	protected constructor(
		protected ngZone: NgZone,
		protected renderer2: Renderer2,
		protected toastService: ToastService,
		protected title: Title,
	) {
	}

	protected get slideLinkActionComponentPositionStyle(): { [key: string]: string } {
		return {
			'top': this.top,
			'left': this.left,
			'width': this.width,
			'height': this.height,
		};
	}

	private get top(): string {
		return (this.endCords.y - this.startCords.y < 0) ? this.endCords.y + '%' : this.startCords.y + '%';
	}

	private get left(): string {
		return (this.endCords.x - this.startCords.x < 0) ? this.endCords.x + '%' : this.startCords.x + '%';
	}

	private get width(): string {
		return `${Math.abs(this.endCords.x - this.startCords.x)}%`;
	}

	private get height(): string {
		return `${Math.abs(this.endCords.y - this.startCords.y)}%`;
	}

	public onMouseMove(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			if (this.element) {
				this.endCords = this.getPercentageCursorPosition(this.getCursorPosition(event));
				this.drawDivElement();
			}
		});
	}

	protected createDivElement(event: MouseEvent): void {
		this.startCords = this.getPercentageCursorPosition(this.getCursorPosition(event));

		this.element = this.renderer2.createElement('div');
		this.renderer2.addClass(this.element, this.slideLinkActionContainerCssClass);
		this.renderer2.setStyle(this.element, 'left', `${this.startCords.x}%`);
		this.renderer2.setStyle(this.element, 'top', `${this.startCords.y}%`);
		this.renderer2.appendChild(this.canvasElement.nativeElement, this.element);
	}

	protected removeDrawnDivElement(): void {
		this.renderer2.removeChild(this.canvasElement.nativeElement, this.element);
		this.element = null;
	}

	protected setCursor(cursorType: CursorTypes): void {
		this.renderer2.setStyle(this.canvasElement.nativeElement, 'cursor', cursorType);
	}

	private drawDivElement(): void {
		this.renderer2.setStyle(this.element, 'width', this.width);
		this.renderer2.setStyle(this.element, 'height', this.height);
		this.renderer2.setStyle(this.element, 'left', this.left);
		this.renderer2.setStyle(this.element, 'top', this.top);
	}

	private getCursorPosition(event: MouseEvent): Coordinates {
		const rect = this.canvasElement.nativeElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		return { x, y };
	}

	private getPercentageCursorPosition(cords: Coordinates): Coordinates {
		return { x: this.toPercentageX(cords.x), y: this.toPercentageY(cords.y) };
	}

	private toPercentageX(x: number): number {
		return (x / this.canvasElement.nativeElement.offsetWidth) * 100;
	}

	private toPercentageY(y: number): number {
		return (y / this.canvasElement.nativeElement.offsetHeight) * 100;
	}

	protected showOpeningToast(): void {
		this.toastService.information('Kliknij, aby zaznaczyć obszar na slajdzie i dodać do niego akcję');
	}

	protected setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string> imageData);
	}

	protected initTitle(): void {
		this.title.setTitle('Edycja slajdu');
	}
}
