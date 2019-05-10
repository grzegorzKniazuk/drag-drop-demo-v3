import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DynamicComponentTypes } from 'src/app/shared/types/dynamic-component-types';
import { merge, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryService {

	protected readonly appViewContainerRef: ViewContainerRef = this.applicationRef.components[0].instance.viewContainerRef;

	constructor(
		protected applicationRef: ApplicationRef,
		protected componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createDynamicComponent<T>(component: Type<DynamicComponentTypes>, props: { [key: string]: any } = {}): Observable<T> {
		const componentFactory: ComponentFactory<DynamicComponentTypes> = this.componentFactoryResolver.resolveComponentFactory(component);
		const componentRef = this.appViewContainerRef.createComponent(componentFactory);

		for (let property of componentRef.instance.inputProps) {
			if (Object.getOwnPropertyNames(props).includes(property)) {
				componentRef.instance[property] = props[property];
			}
		}

		return this.mergeActions<T>(componentRef);
	}

	protected mergeActions<T>(componentRef: ComponentRef<DynamicComponentTypes>): Observable<T> {
		return merge(
			componentRef.instance.onSaveAction,
			componentRef.instance.onCancelAction,
		).pipe(
			first(),
			tap(() => this.appViewContainerRef.clear()),
			filter((actionResponse: T) => !!actionResponse),
			map((actionResponse: T) => actionResponse),
		);
	}
}
