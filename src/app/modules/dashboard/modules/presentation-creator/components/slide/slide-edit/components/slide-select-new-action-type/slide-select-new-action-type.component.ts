import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';

@Component({
	selector: 'app-slide-select-new-action-type',
	templateUrl: './slide-select-new-action-type.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideSelectNewActionTypeComponent implements OnInit {

	public onNextStepOrCancel$: EventEmitter<string | null> = new EventEmitter<string | null>();
	public actionTypes: SelectItem[];
	public isVisible = true;
	public selectedActionType: SlideActionTypes;

	constructor() {
	}

	ngOnInit() {
		this.initActionTypes();
	}

	public onNextStep(): void {
		this.isVisible = false;
		this.onNextStepOrCancel$.emit(this.selectedActionType);
	}

	public onCancel(): void {
		this.isVisible = false;
		this.onNextStepOrCancel$.emit(null);
	}

	private initActionTypes(): void {
		this.actionTypes = [
			{ label: 'Link do slajdu w prezentacji', value: SlideActionTypes.INTERNAL_SLIDE_LINK },
			{ label: 'Link do innej prezentacji', value: SlideActionTypes.EXTERNAL_PRESENTATION_LINK },
			{ label: 'Link do zewnętrznego źródła', value: SlideActionTypes.EXTERNAL_WEB_LINK },
		];
	}
}
