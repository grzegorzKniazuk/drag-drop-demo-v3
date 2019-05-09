import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@Component({
	selector: 'app-slide-lightbox',
	templateUrl: './slide-lightbox.component.html',
	styleUrls: [ './slide-lightbox.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLightboxComponent extends BaseDynamicComponent {

	public imageData: string | ArrayBuffer;

	@HostListener('click', [ '$event' ])
	public onCancel(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.onCancelAction.emit();
	}
}
