import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlideActionFormComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/slide-action-form/slide-action-form.component';

@Component({
	selector: 'app-slide-action-add-form',
	templateUrl: './slide-action-add-form.component.html',
	styleUrls: [ './slide-action-add-form.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideActionAddFormComponent extends SlideActionFormComponent {

	constructor() {
		super();
	}
}
