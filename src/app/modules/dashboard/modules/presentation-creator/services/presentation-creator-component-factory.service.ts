import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { first } from 'rxjs/operators';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/internal-slide-link/internal-slide-link.component';

@Injectable()
export class PresentationCreatorComponentFactoryService {

	private readonly columnTitleComponentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(ColumnTitleComponent);
	private readonly slideLightboxComponentFactory: ComponentFactory<SlideLightboxComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideLightboxComponent);
	private readonly slideSelectNewActionTypeComponentFactory: ComponentFactory<SlideSelectNewActionTypeComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideSelectNewActionTypeComponent);
	private readonly slideInternalSlideLinkComponentFactory: ComponentFactory<InternalSlideLinkComponent> = this.componentFactoryResolver.resolveComponentFactory(InternalSlideLinkComponent);

	private columnTitleComponentRef: ComponentRef<ColumnTitleComponent>;
	private slideLightboxComponentRef: ComponentRef<SlideLightboxComponent>;
	private slideSelectNewActionTypeComponentRef: ComponentRef<SlideSelectNewActionTypeComponent>;
	private internalSlideLinkComponentRef: ComponentRef<InternalSlideLinkComponent>;

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

	public createSlideSelectNewActionTypeComponent(): EventEmitter<string | null> {
		this.slideSelectNewActionTypeComponentRef = this.appViewContainerRef.createComponent(this.slideSelectNewActionTypeComponentFactory);

		return this.slideSelectNewActionTypeComponentRef.instance.onNextStepOrCancel$;
	}

	public createInternalSlideLinkComponent(editedSlideId: number): void {
		this.internalSlideLinkComponentRef = this.appViewContainerRef.createComponent(this.slideInternalSlideLinkComponentFactory);
		this.internalSlideLinkComponentRef.instance.editedSlideId = editedSlideId;
	}
}
