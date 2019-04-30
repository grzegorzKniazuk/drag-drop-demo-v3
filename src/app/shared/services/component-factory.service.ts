import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/shared/components/column/column-title/column-title.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SlideLightboxComponent } from 'src/app/shared/components/slide/slide-lightbox/slide-lightbox.component';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryService {

	private columnTitleComponentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(ColumnTitleComponent);
	private confirmDialogComponentFactory: ComponentFactory<ConfirmDialogComponent> = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
	private slideLightboxComponentFactory: ComponentFactory<SlideLightboxComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideLightboxComponent);
	private columnTitleComponentRef: ComponentRef<ColumnTitleComponent>;
	private confirmDialogComponentRef: ComponentRef<ConfirmDialogComponent>;
	private slideLightboxComponentRef: ComponentRef<SlideLightboxComponent>;

	private readonly appViewContainerRef: ViewContainerRef = this.applicationRef.components[0].instance.viewContainerRef;

	constructor(
		private applicationRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createColumnTitleComponent(): ColumnTitleComponent {
		this.columnTitleComponentRef = this.appViewContainerRef.createComponent(this.columnTitleComponentFactory);
		return <ColumnTitleComponent>this.columnTitleComponentRef.instance;
	}

	public createConfirmDialogComponent(header: string, message: string): ConfirmDialogComponent {
		this.confirmDialogComponentRef = this.appViewContainerRef.createComponent(this.confirmDialogComponentFactory);
		this.confirmDialogComponentRef.instance.header = header;
		this.confirmDialogComponentRef.instance.message = message;

		return this.confirmDialogComponentRef.instance;
	}

	public createSlideLightboxComponent(imageData: string | ArrayBuffer): void {
		this.slideLightboxComponentRef = this.appViewContainerRef.createComponent(this.slideLightboxComponentFactory);
		this.slideLightboxComponentRef.instance.imageData = imageData;
		this.slideLightboxComponentRef.instance.onClick.pipe(
			first()
		).subscribe(() => {
			this.appViewContainerRef.clear();
		});
	}
}
