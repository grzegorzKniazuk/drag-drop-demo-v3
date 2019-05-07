import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
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
		private ngZone: NgZone,
	) {
	}

	ngOnInit() {
	}

	public removeAction(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onRemoveAction.emit(this.actionParams.id);
	}

	@HostListener('mouseenter')
	public onMouseEnter(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = true;
		});
	}

	@HostListener('mouseleave')
	public onMouseLeave(): void {
		this.ngZone.runOutsideAngular(() => {
			event.stopPropagation();
			this.isElementOnMouseEnter = false;
		});
	}
}
