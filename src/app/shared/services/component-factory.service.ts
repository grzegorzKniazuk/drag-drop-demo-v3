import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/shared/components/column/column-title/column-title.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryService {

	private columnTitleComponentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory<ColumnTitleComponent>(ColumnTitleComponent);
	private confirmDialogComponentFactory: ComponentFactory<ConfirmDialogComponent> = this.componentFactoryResolver.resolveComponentFactory<ConfirmDialogComponent>(ConfirmDialogComponent);
	private columnTitleComponentRef: ComponentRef<ColumnTitleComponent>;
	private confirmDialogComponentRef: ComponentRef<ConfirmDialogComponent>;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createColumnTitleComponent(viewContainerRef: ViewContainerRef): ColumnTitleComponent {
		this.columnTitleComponentRef = viewContainerRef.createComponent(this.columnTitleComponentFactory);
		return <ColumnTitleComponent>this.columnTitleComponentRef.instance;
	}

	public createConfirmDialogComponent(viewContainerRef: ViewContainerRef, header: string, message: string): ConfirmDialogComponent {
		this.confirmDialogComponentRef = viewContainerRef.createComponent(this.confirmDialogComponentFactory);
		this.confirmDialogComponentRef.instance.header = header;
		this.confirmDialogComponentRef.instance.message = message;

		return this.confirmDialogComponentRef.instance;
	}
}
