import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { first } from 'rxjs/operators';
import { SlideActionAddFormComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/slide-action-form/slide-action-add-form/slide-action-add-form.component';

@Injectable()
export class PresentationCreatorComponentFactoryService {

	private readonly columnTitleComponentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(ColumnTitleComponent);
	private readonly slideLightboxComponentFactory: ComponentFactory<SlideLightboxComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideLightboxComponent);
	private readonly slideActionAddFormComponentFactory: ComponentFactory<SlideActionAddFormComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideActionAddFormComponent);

	private columnTitleComponentRef: ComponentRef<ColumnTitleComponent>;
	private slideLightboxComponentRef: ComponentRef<SlideLightboxComponent>;
	private slideActionAddFormComponentRef: ComponentRef<SlideActionAddFormComponent>;

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

	public createSlideLightboxComponent(imageData: string | ArrayBuffer): void {
		this.slideLightboxComponentRef = this.appViewContainerRef.createComponent(this.slideLightboxComponentFactory);
		this.slideLightboxComponentRef.instance.imageData = imageData;
		this.slideLightboxComponentRef.instance.onClick.pipe(
			first(),
		).subscribe(() => {
			this.appViewContainerRef.clear();
		});
	}

	public createSlideAddFormComponent(): void {
		this.slideActionAddFormComponentRef = this.appViewContainerRef.createComponent(this.slideActionAddFormComponentFactory);
	}
}
