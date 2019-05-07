import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

	constructor() {
	}

	ngOnInit() {
	}
}
