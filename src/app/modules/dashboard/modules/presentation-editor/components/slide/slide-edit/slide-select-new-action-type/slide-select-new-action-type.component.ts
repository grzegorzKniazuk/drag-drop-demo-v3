import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { BaseDynamicComponent } from 'src/app/shared/utils/base-dynamic-component.';

@Component({
	selector: 'app-slide-select-new-action-type',
	templateUrl: './slide-select-new-action-type.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideSelectNewActionTypeComponent extends BaseDynamicComponent implements OnInit {

	public readonly inputProps = [ 'selectedActionType' ];
	public actionTypes: SelectItem[];
	public isVisible = true;
	public selectedActionType: SlideActionTypes;

	ngOnInit() {
		this.initActionTypes();
	}

	public onNextStep(): void {
		this.isVisible = false;
		this.onSaveAction.emit(this.selectedActionType);
	}

	@HostListener('document:keydown.escape')
	public onCancel(): void {
		this.isVisible = false;
		this.onCancelAction.emit();
	}

	private initActionTypes(): void {
		this.actionTypes = [
			{ label: 'Link do slajdu w prezentacji', value: SlideActionTypes.INTERNAL_SLIDE_LINK },
			{ label: 'Link do innej prezentacji', value: SlideActionTypes.EXTERNAL_PRESENTATION_LINK },
			{ label: 'Link do zewnętrznego źródła', value: SlideActionTypes.EXTERNAL_WEB_LINK },
		];
	}
}
