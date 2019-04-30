import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryBaseService {

	private readonly confirmDialogComponentFactory: ComponentFactory<ConfirmDialogComponent> = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
	private confirmDialogComponentRef: ComponentRef<ConfirmDialogComponent>;

	private readonly appViewContainerRef: ViewContainerRef = this.applicationRef.components[0].instance.viewContainerRef;

	constructor(
		private applicationRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createConfirmDialogComponent(header: string, message: string): ConfirmDialogComponent {
		this.confirmDialogComponentRef = this.appViewContainerRef.createComponent(this.confirmDialogComponentFactory);
		this.confirmDialogComponentRef.instance.header = header;
		this.confirmDialogComponentRef.instance.message = message;

		return this.confirmDialogComponentRef.instance;
	}
}
