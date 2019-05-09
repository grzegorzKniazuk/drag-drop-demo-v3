import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';
import { SlideActionParams } from 'src/app/shared/interfaces';

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
	@Output() public onMoveAction: EventEmitter<number> = new EventEmitter<number>();
	@Output() public onPerformAction: EventEmitter<SlideActionParams> = new EventEmitter<SlideActionParams>();
	public isElementOnMouseEnter: boolean;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {
	}

	public onMove(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onMoveAction.emit(this.actionParams.id);
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
		});
	}

	@HostListener('mouseleave', [ '$event' ])
	private onMouseLeave(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = false;
		});
	}
}
