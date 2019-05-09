import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-external-link',
	templateUrl: './external-link.component.html',
	styleUrls: [ './external-link.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkComponent implements OnInit {

	public onSaveAction: EventEmitter<string> = new EventEmitter();
	public onCancelAction: EventEmitter<null> = new EventEmitter();

	public link: string;
	public isVisible = true;

	constructor() {
	}

	ngOnInit() {
	}

	public onSave(): void {
		this.isVisible = false;
		this.onSaveAction.emit(this.link);

	}

	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit(null);
	}
}
