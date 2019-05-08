import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
import { SlideLinkActionParams } from 'src/app/shared/interfaces/slide-link-action-params';

@Component({
	selector: 'app-slide-link-action',
	templateUrl: './slide-link-action.component.html',
	styleUrls: [ './slide-link-action.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLinkActionComponent implements OnInit {

	@Input() public isEditMode: boolean;
	@Input() public actionParams: SlideLinkActionParams;
	@Output() public onRemoveAction: EventEmitter<number> = new EventEmitter<number>();
	public isElementOnMouseEnter: boolean;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {
	}

	ngOnInit() {
	}

	public onMove(event: MouseEvent): void {
		event.stopImmediatePropagation();
	}

	public onEdit(event: MouseEvent): void {
		event.stopImmediatePropagation();
	}

	public onRemove(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onRemoveAction.emit(this.actionParams.id);
	}

	@HostListener('mouseenter')
	private onMouseEnter(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = true;
		});
	}

	@HostListener('mouseleave')
	private onMouseLeave(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = false;
		});
	}

	@HostListener('click', ['$event'])
	private preventCreateComponentInExistingComponent(event: MouseEvent): void {
		event.stopPropagation();
	}
}
