import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import { SlideActionParams } from 'src/app/shared/interfaces';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';

@Component({
	selector: 'app-slide-link-action',
	templateUrl: './slide-action.component.html',
	styleUrls: [ './slide-action.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideActionComponent {

	@Input() public isEditMode: boolean;
	@Input() public actionParams: SlideActionParams;
	@Output() public onRemoveAction: EventEmitter<number> = new EventEmitter<number>();
	@Output() public onEditAction: EventEmitter<number> = new EventEmitter<number>();
	@Output() public onPerformAction: EventEmitter<SlideActionParams> = new EventEmitter<SlideActionParams>();
	public isElementOnMouseEnter: boolean;
	@ViewChild('slideActionElement') private readonly slideActionElement: ElementRef;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
		private renderer2: Renderer2,
	) {
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
			this.setCursor(CursorTypes.DEFAULT);
		});
	}

	private setCursor(cursorType: CursorTypes): void {
		this.renderer2.setStyle(this.slideActionElement.nativeElement, 'cursor', cursorType);
	}
}
