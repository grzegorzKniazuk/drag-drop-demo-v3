import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { PresentationTitleComponent } from 'src/app/modules/dashboard/modules/presentation-list/components/presentation-title/presentation-title.component';

@Injectable()
export class PresentationListComponentFactoryService {

	private readonly presentationTitleComponentFactory: ComponentFactory<PresentationTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(PresentationTitleComponent);
	private presentationTitleComponentRef: ComponentRef<PresentationTitleComponent>;
	private readonly appViewContainerRef: ViewContainerRef = this.applicationRef.components[0].instance.viewContainerRef;

	constructor(
		private applicationRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	private createPresentationTitleComponent(): PresentationTitleComponent {
		this.presentationTitleComponentRef = this.appViewContainerRef.createComponent(this.presentationTitleComponentFactory);
		return this.presentationTitleComponentRef.instance;
	}
}
