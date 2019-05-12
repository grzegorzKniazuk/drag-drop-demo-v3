import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import { SlideActionParams, Style } from 'src/app/shared/interfaces';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';
import { ResizeDirection } from 'src/app/shared/enums/resize-direction';
import { LEFT_MOUSE_BUTTON_CODE, RIGHT_MOUSE_BUTTON_CODE } from 'src/app/shared/constants/mouse-button-codes';

@Component({
	selector: 'app-slide-link-action',
	templateUrl: './slide-action.component.html',
	styleUrls: [ './slide-action.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideActionComponent {

	@Input() public parentElement: ElementRef;
	@Input() public isEditMode: boolean;
	@Input() public actionParams: SlideActionParams;
	@Output() public onRemoveAction: EventEmitter<number> = new EventEmitter<number>();
	@Output() public onEditAction: EventEmitter<number> = new EventEmitter<number>();
	@Output() public onResizeAction: EventEmitter<SlideActionParams> = new EventEmitter<SlideActionParams>();
	@Output() public onPerformAction: EventEmitter<SlideActionParams> = new EventEmitter<SlideActionParams>();
	public isElementOnMouseEnter: boolean;
	@ViewChild('slideActionElement') private readonly slideActionElement: ElementRef;
	private resizeDirection: ResizeDirection | string;
	private resizing: boolean;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
		private renderer2: Renderer2,
	) {
	}

	public onResize(event: MouseEvent, direction: ResizeDirection | string): void {
		event.stopImmediatePropagation();

		this.resizeDirection = direction;
		this.resizing = true;
	}

	private onMouseUp(event: MouseEvent): void {
		event.stopImmediatePropagation();

		if (this.isEditMode && this.resizing) {
			this.setCursor(CursorTypes.GRAB);
		}

		this.resizing = false;
		this.onResizeAction.emit(this.actionParams);
	}

	@HostListener('mousemove', [ '$event' ])
	private onMouseMove(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			if (this.isEditMode && this.resizing && (event.buttons === LEFT_MOUSE_BUTTON_CODE || event.buttons === RIGHT_MOUSE_BUTTON_CODE)) {
				switch (this.resizeDirection) {
					case ResizeDirection.TOP_LEFT: {
						this.setCursor(CursorTypes.NW_RESIZE);
						this.actionParams.style = this.resizeNWElement(event);
						break;
					}
					case ResizeDirection.TOP: {
						this.setCursor(CursorTypes.N_RESIZE);
						this.actionParams.style = this.resizeNElement(event);
						break;
					}
					case ResizeDirection.TOP_RIGHT: {
						this.setCursor(CursorTypes.NE_RESIZE);
						this.actionParams.style = this.resizeNEElement(event);
						break;
					}
					case ResizeDirection.RIGHT: {
						this.setCursor(CursorTypes.E_RESIZE);
						this.actionParams.style = this.resizeEElement(event);
						break;
					}
					case ResizeDirection.BOTTOM_RIGHT: {
						this.setCursor(CursorTypes.SE_RESIZE);
						this.actionParams.style = this.resizeSEElement(event);
						break;
					}
					case ResizeDirection.BOTTOM: {
						this.setCursor(CursorTypes.S_RESIZE);
						this.actionParams.style = this.resizeSElement(event);
						break;
					}
					case ResizeDirection.BOTTOM_LEFT: {
						this.setCursor(CursorTypes.SW_RESIZE);
						this.actionParams.style = this.resizeSWElement(event);
						break;
					}
					case ResizeDirection.LEFT: {
						this.setCursor(CursorTypes.W_RESIZE);
						this.actionParams.style = this.resizeWElement(event);
						break;
					}
				}
			}
		});
	}

	private resizeNWElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y += event.movementY)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x += event.movementX)}%`,
			'width': `${this.actionParams.size.width -= event.movementX}px`,
			'height': `${this.actionParams.size.height -= event.movementY}px`,
		};
	}

	private resizeNElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y += event.movementY)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x)}%`,
			'width': `${this.actionParams.size.width}px`,
			'height': `${this.actionParams.size.height -= event.movementY}px`,
		};
	}

	private resizeNEElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y += event.movementY)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x)}%`,
			'width': `${this.actionParams.size.width += event.movementX}px`,
			'height': `${this.actionParams.size.height -= event.movementY}px`,
		};
	}

	private resizeEElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x)}%`,
			'width': `${this.actionParams.size.width += event.movementX}px`,
			'height': `${this.actionParams.size.height}px`,
		};
	}

	private resizeSEElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x)}%`,
			'width': `${this.actionParams.size.width += event.movementX}px`,
			'height': `${this.actionParams.size.height += event.movementY}px`,
		};
	}

	private resizeSElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x)}%`,
			'width': `${this.actionParams.size.width}px`,
			'height': `${this.actionParams.size.height += event.movementY}px`,
		};
	}

	private resizeSWElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x += event.movementX)}%`,
			'width': `${this.actionParams.size.width -= event.movementX}px`,
			'height': `${this.actionParams.size.height += event.movementY}px`,
		};
	}

	private resizeWElement(event: MouseEvent): Style {
		return {
			'top': `${this.toPercentageY(this.actionParams.position.y)}%`,
			'left': `${this.toPercentageX(this.actionParams.position.x += event.movementX)}%`,
			'width': `${this.actionParams.size.width -= event.movementX}px`,
			'height': `${this.actionParams.size.height}px`,
		};
	}

	private toPercentageX(x: number): number {
		return (x / this.parentElement.nativeElement.offsetWidth) * 100;
	}

	private toPercentageY(y: number): number {
		return (y / this.parentElement.nativeElement.offsetHeight) * 100;
	}

	public onEdit(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onEditAction.emit(this.actionParams.id);
	}

	public onRemove(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onRemoveAction.emit(this.actionParams.id);
	}

	@HostListener('click', [ '$event' ])
	private onPerform(event: MouseEvent): void {
		event.stopImmediatePropagation();

		if (!this.isEditMode) {
			this.onPerformAction.emit(this.actionParams);
		}
	}

	@HostListener('mouseenter', [ '$event' ])
	private onMouseEnter(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = true;
			if (this.isEditMode) {
				this.setCursor(CursorTypes.GRAB);
			}
		});
	}

	@HostListener('mouseleave', [ '$event' ])
	private onMouseLeave(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = false;
			this.resizing = false;

			this.setCursor(CursorTypes.DEFAULT);

			this.onResizeAction.emit(this.actionParams);
		});
	}

	private setCursor(cursorType: CursorTypes): void {
		this.renderer2.setStyle(this.slideActionElement.nativeElement, 'cursor', cursorType);
	}
}
