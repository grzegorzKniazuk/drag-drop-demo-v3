import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseMenuComponent } from 'src/app/shared/utils/base-menu-component';

@Component({
	selector: 'app-list-menu-bar',
	templateUrl: './list-menu-bar.component.html',
	styleUrls: [ './list-menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListMenuBarComponent extends BaseMenuComponent {

	@Output() public readonly onInitNewPresentation: EventEmitter<void> = new EventEmitter<void>();

	public initPresentationEditor(): void {
		this.onInitNewPresentation.emit();
	}
}
