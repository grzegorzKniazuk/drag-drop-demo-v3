import { ChangeDetectionStrategy, Component, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'app-slide-lightbox',
	templateUrl: './slide-lightbox.component.html',
	styleUrls: [ './slide-lightbox.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLightboxComponent {

	public onClick: EventEmitter<void> = new EventEmitter<void>();

	public imageData: string | ArrayBuffer;

	@HostListener('click', ['$event'])
	public closeLightbox(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onClick.emit();
	}
}
