import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@Component({
	selector: 'app-external-link',
	templateUrl: './external-link.component.html',
	styleUrls: [ './external-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkComponent extends BaseDynamicComponent implements OnInit {

	public readonly inputProps = [ 'link' ];
	public link: string;
	public isVisible = true;

	ngOnInit() {
	}

	@HostListener('document:keydown.enter')
	public onSave(): void {
		if (this.link) {
			this.isVisible = false;
			this.onSaveAction.emit(this.link);
		}
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}
}
