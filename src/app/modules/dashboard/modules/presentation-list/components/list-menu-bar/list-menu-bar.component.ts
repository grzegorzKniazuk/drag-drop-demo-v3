import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-list-menu-bar',
	templateUrl: './list-menu-bar.component.html',
	styleUrls: [ './list-menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListMenuBarComponent implements OnInit {

	@Output() public onInitNewPresentation: EventEmitter<void> = new EventEmitter<void>();
	public menuItems: MenuItem[] = [];

	constructor() {
	}

	ngOnInit() {
		this.buildMenu();
	}

	private buildMenu(): void {
		this.menuItems = [];
	}

	public initPresentationEditor(): void {
		this.onInitNewPresentation.emit();
	}
}
