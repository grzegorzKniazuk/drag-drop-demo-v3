import { Coordinates, Style } from 'src/app/shared/interfaces';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';
import { ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Title } from '@angular/platform-browser';

export abstract class DrawZoneBase {

	public readonly slideLinkActionContainerCssClass = 'slide-link-action-container';
	@ViewChild('drawZoneElement') public readonly drawZone: ElementRef;
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

	protected get slideLinkActionComponentPositionStyle(): Style {
		return {
			'top': `${this.toPercentageY(this.top)}%`,
			'left': `${this.toPercentageX(this.left)}%`,
			'width': `${this.width}px`,
			'height': `${this.height}px`,
		};
	}

	protected get top(): number {
		return (this.endCords.y - this.startCords.y < 0) ? this.endCords.y : this.startCords.y;
	}

	protected get left(): number {
		return (this.endCords.x - this.startCords.x < 0) ? this.endCords.x : this.startCords.x;
	}

	protected get width(): number {
		return Math.abs(this.endCords.x - this.startCords.x);
	}

	protected get height(): number {
		return Math.abs(this.endCords.y - this.startCords.y);
	}

	public onMouseMove(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			if (this.element) {
				this.endCords = this.getCursorPosition(event);
				this.drawDivElement();
			}
		});
	}

	protected createDivElement(event: MouseEvent): void {
		this.startCords = this.getCursorPosition(event);

		this.element = this.renderer2.createElement('div');
		this.renderer2.addClass(this.element, this.slideLinkActionContainerCssClass);
		this.renderer2.setStyle(this.element, 'left', `${this.startCords.x}px`);
		this.renderer2.setStyle(this.element, 'top', `${this.startCords.y}px`);
		this.renderer2.appendChild(this.drawZone.nativeElement, this.element);
	}

	protected removeDrawnDivElement(): void {
		this.renderer2.removeChild(this.drawZone.nativeElement, this.element);
		this.element = null;
	}

	protected setCursor(cursorType: CursorTypes): void {
		this.renderer2.setStyle(this.drawZone.nativeElement, 'cursor', cursorType);
	}

	protected showOpeningToast(): void {
		this.toastService.information('Kliknij, aby zaznaczyć obszar na slajdzie i dodać do niego akcję');
	}

	protected setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string>imageData);
	}

	protected initTitle(): void {
		this.title.setTitle('Edycja slajdu');
	}

	protected toPercentageX(x: number): number {
		return (x / this.drawZone.nativeElement.offsetWidth) * 100;
	}

	protected toPercentageY(y: number): number {
		return (y / this.drawZone.nativeElement.offsetHeight) * 100;
	}

	private drawDivElement(): void {
		this.renderer2.setStyle(this.element, 'width', `${this.width}px`);
		this.renderer2.setStyle(this.element, 'height', `${this.height}px`);
		this.renderer2.setStyle(this.element, 'left', `${this.left}px`);
		this.renderer2.setStyle(this.element, 'top', `${this.top}px`);
	}

	private getCursorPosition(event: MouseEvent): Coordinates {
		const rect = this.drawZone.nativeElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		return { x, y };
	}

	private getPercentageCursorPosition(cords: Coordinates): Coordinates {
		return { x: this.toPercentageX(cords.x), y: this.toPercentageY(cords.y) };
	}
}
