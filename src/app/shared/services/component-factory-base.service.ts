import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PresentationTitleComponent } from 'src/app/shared/components/presentation-title/presentation-title.component';
import { DynamicComponentTypes } from 'src/app/shared/types/dynamic-component-types';
import { merge, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryBaseService {

	private readonly presentationTitleComponentFactory: ComponentFactory<PresentationTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(PresentationTitleComponent);
	private readonly confirmDialogComponentFactory: ComponentFactory<ConfirmDialogComponent> = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);

	private presentationTitleComponentRef: ComponentRef<PresentationTitleComponent>;
	private confirmDialogComponentRef: ComponentRef<ConfirmDialogComponent>;

	protected readonly appViewContainerRef: ViewContainerRef = this.applicationRef.components[0].instance.viewContainerRef;

	constructor(
		protected applicationRef: ApplicationRef,
		protected componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public createConfirmDialogComponent(header: string, message: string): Observable<boolean> {
		this.confirmDialogComponentRef = this.appViewContainerRef.createComponent(this.confirmDialogComponentFactory);
		this.confirmDialogComponentRef.instance.header = header;
		this.confirmDialogComponentRef.instance.message = message;

		return this.mergeActions(this.confirmDialogComponentRef);
	}

	public createPresentationTitleComponent(isEditMode: boolean): Observable<string> {
		this.presentationTitleComponentRef = this.appViewContainerRef.createComponent(this.presentationTitleComponentFactory);
		this.presentationTitleComponentRef.instance.isEditMode = isEditMode;

		return this.mergeActions(this.presentationTitleComponentRef);
	}

	private clearViewContainerRef(): void {
		this.appViewContainerRef.clear();
	}

	protected mergeActions<T>(componentRef: ComponentRef<DynamicComponentTypes>): Observable<T> {
		return merge(
			componentRef.instance.onSaveAction,
			componentRef.instance.onCancelAction,
		).pipe(
			first(),
			tap(() => this.clearViewContainerRef()),
			filter((actionResponse: T) => !!actionResponse),
			map((actionResponse: T) => {
				return actionResponse;
			}),
		);
	}
}
