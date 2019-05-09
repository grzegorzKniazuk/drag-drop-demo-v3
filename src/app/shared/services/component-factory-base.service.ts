import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PresentationTitleComponent } from 'src/app/shared/components/presentation-title/presentation-title.component';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryBaseService {

	private readonly presentationTitleComponentFactory: ComponentFactory<PresentationTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(PresentationTitleComponent);
	private readonly confirmDialogComponentFactory: ComponentFactory<ConfirmDialogComponent> = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);

	private presentationTitleComponentRef: ComponentRef<PresentationTitleComponent>;
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

	public createPresentationTitleComponent(): PresentationTitleComponent {
		this.presentationTitleComponentRef = this.appViewContainerRef.createComponent(this.presentationTitleComponentFactory);
		this.presentationTitleComponentRef.instance.isEditMode = false;

		return this.presentationTitleComponentRef.instance;
	}

	public createEditPresentationTitleComponent(): PresentationTitleComponent {
		this.presentationTitleComponentRef = this.appViewContainerRef.createComponent(this.presentationTitleComponentFactory);
		this.presentationTitleComponentRef.instance.isEditMode = true;

		return this.presentationTitleComponentRef.instance;
	}

	public clearViewContainerRef(): void {
		this.appViewContainerRef.clear();
	}
}
