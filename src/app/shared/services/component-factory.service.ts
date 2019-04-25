import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/shared/components/column/column-title/column-title.component';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryService {

	private componentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(ColumnTitleComponent);
	private componentRef: ComponentRef<ColumnTitleComponent>;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createColumnTitleComponent(viewContainerRef: ViewContainerRef): ColumnTitleComponent {
		this.componentRef = viewContainerRef.createComponent(this.componentFactory);
		return this.componentRef.instance;
	}
}
