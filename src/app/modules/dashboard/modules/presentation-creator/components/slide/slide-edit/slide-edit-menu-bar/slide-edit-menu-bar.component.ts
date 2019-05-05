import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-slide-edit-menu-bar',
	templateUrl: './slide-edit-menu-bar.component.html',
	styleUrls: [ './slide-edit-menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditMenuBarComponent implements OnInit {

	public menuItems: MenuItem[] = [];

	constructor(
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.buildMenu();
	}

	private buildMenu(): void {
		this.menuItems = [];
	}

	public onSave(): void {

	}

	public onCancel(): void {
		this.componentFactoryBaseService.createConfirmDialogComponent(
			'Uwaga',
			'Zmiany nie zostaną zapisane! Czy napewno chcesz wyjść?',
		).onAcceptOrConfirm$.pipe(
			first(),
		).subscribe((isAccepted: boolean) => {
			if (isAccepted) {
				this.router.navigateByUrl('/dashboard/presentation-creator');
			}
		});
	}
}
