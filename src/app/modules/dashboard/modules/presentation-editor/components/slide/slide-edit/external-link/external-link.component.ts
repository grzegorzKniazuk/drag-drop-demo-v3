import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

	public onSave(): void {
		this.isVisible = false;
		this.onSaveAction.emit(this.link);
	}

	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}
}
