import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ShowLibrarySlider } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';

@Component({
	selector: 'app-menu-bar',
	templateUrl: './menu-bar.component.html',
	styleUrls: [ './menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {

	public menuItems: MenuItem[] = [];

	constructor(
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.buildMenu();
	}

	private buildMenu(): void {
		this.menuItems = [];
	}

	public openSlider(): void {
		this.store.dispatch(new ShowLibrarySlider());
	}
}
