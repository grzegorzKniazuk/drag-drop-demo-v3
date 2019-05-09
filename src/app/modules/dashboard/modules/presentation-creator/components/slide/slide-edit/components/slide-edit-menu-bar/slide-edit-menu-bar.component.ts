import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { Router } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

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
		private componentFactoryBaseService: ComponentFactoryBaseService,
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
		this.componentFactoryBaseService.createConfirmDialogComponent(
			'Uwaga',
			'Zmiany nie zostaną zapisane! Czy napewno chcesz wyjść?',
		).onAcceptOrConfirm$.pipe(
			first(),
			filter((isAccepted: boolean) => isAccepted),
			tap(() => {
				this.componentFactoryBaseService.clearViewContainerRef();
			}),
		).subscribe(() => {
			this.router.navigateByUrl('/dashboard/presentation-creator');
		});
	}

	private buildMenu(): void {
		this.menuItems = [];
	}
}
