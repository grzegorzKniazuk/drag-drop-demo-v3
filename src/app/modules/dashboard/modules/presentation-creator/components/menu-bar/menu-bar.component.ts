import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ShowLibrarySlider } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/creator-options.actions';
import { Observable } from 'rxjs';
import { selectEditorPresentationTitle } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/creator-metadata.selectors';

@Component({
	selector: 'app-menu-bar',
	templateUrl: './menu-bar.component.html',
	styleUrls: [ './menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {

	public presentationTitle$: Observable<string>;
	public menuItems: MenuItem[] = [];

	constructor(
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
		this.buildMenu();
		this.initObservables();
	}

	private buildMenu(): void {
		this.menuItems = [];
	}

	private initObservables(): void {
		this.presentationTitle$ = this.store.pipe(select(selectEditorPresentationTitle));
	}

	public openSlider(): void {
		this.store.dispatch(new ShowLibrarySlider());
	}
}
