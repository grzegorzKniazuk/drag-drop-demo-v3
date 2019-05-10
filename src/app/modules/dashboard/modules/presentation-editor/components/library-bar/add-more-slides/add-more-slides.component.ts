import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
	selector: 'app-add-more-slides',
	templateUrl: './add-more-slides.component.html',
	styleUrls: [ './add-more-slides.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMoreSlidesComponent {

	@Output() public initFileUpload: EventEmitter<void> = new EventEmitter<void>();

	@HostListener('click', [ '$event' ])
	private onClick(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.initFileUpload.emit();
	}
}
