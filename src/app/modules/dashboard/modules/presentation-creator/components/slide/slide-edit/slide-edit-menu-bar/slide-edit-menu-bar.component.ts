import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide-edit-menu-bar',
	templateUrl: './slide-edit-menu-bar.component.html',
	styleUrls: [ './slide-edit-menu-bar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditMenuBarComponent implements OnInit, OnDestroy {

	@Output() public onSave: EventEmitter<void> = new EventEmitter<void>();
	public menuItems: MenuItem[] = [];

	constructor(
		private componentFactoryBaseService: ComponentFactoryService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.buildMenu();
	}

	ngOnDestroy() {
	}

	public save(): void {
		this.onSave.emit();
	}

	public cancel(): void {
		this.componentFactoryBaseService.createDynamicComponent<boolean>(
			ConfirmDialogComponent,
			{
				header: 'Uwaga',
				message: 'Zmiany nie zostaną zapisane! Czy napewno chcesz wyjść?',
			}
		).subscribe(() => {
			this.router.navigateByUrl('/dashboard/presentation-creator');
		});
	}

	private buildMenu(): void {
		this.menuItems = [];
	}
}
