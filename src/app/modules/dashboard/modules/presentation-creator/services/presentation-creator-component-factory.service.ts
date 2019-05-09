import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { filter, first, map, tap } from 'rxjs/operators';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/slide-select-new-action-type/slide-select-new-action-type.component';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/internal-slide/internal-slide-link/internal-slide-link.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/external-link/external-link.component';
import { merge, Observable } from 'rxjs';

@Injectable()
export class PresentationCreatorComponentFactoryService {

	private readonly columnTitleComponentFactory: ComponentFactory<ColumnTitleComponent> = this.componentFactoryResolver.resolveComponentFactory(ColumnTitleComponent);
	private readonly slideLightboxComponentFactory: ComponentFactory<SlideLightboxComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideLightboxComponent);
	private readonly slideSelectNewActionTypeComponentFactory: ComponentFactory<SlideSelectNewActionTypeComponent> = this.componentFactoryResolver.resolveComponentFactory(SlideSelectNewActionTypeComponent);
	private readonly slideInternalSlideLinkComponentFactory: ComponentFactory<InternalSlideLinkComponent> = this.componentFactoryResolver.resolveComponentFactory(InternalSlideLinkComponent);
	private readonly externalLinkComponentComponentFactory: ComponentFactory<ExternalLinkComponent> = this.componentFactoryResolver.resolveComponentFactory(ExternalLinkComponent);

	private columnTitleComponentRef: ComponentRef<ColumnTitleComponent>;
	private slideLightboxComponentRef: ComponentRef<SlideLightboxComponent>;
	private slideSelectActionTypeComponentRef: ComponentRef<SlideSelectNewActionTypeComponent>;
	private internalSlideLinkComponentRef: ComponentRef<InternalSlideLinkComponent>;
	private externalLinkComponentRef: ComponentRef<ExternalLinkComponent>;

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
		this.slideSelectActionTypeComponentRef = this.appViewContainerRef.createComponent(this.slideSelectNewActionTypeComponentFactory);

		return this.slideSelectActionTypeComponentRef.instance.onNextStepOrCancel$;
	}

	public createSlideEditActionTypeComponent(alreadySelectedActionType: SlideActionTypes): EventEmitter<string | null> {
		this.slideSelectActionTypeComponentRef = this.appViewContainerRef.createComponent(this.slideSelectNewActionTypeComponentFactory);
		this.slideSelectActionTypeComponentRef.instance.selectedActionType = alreadySelectedActionType;

		return this.slideSelectActionTypeComponentRef.instance.onNextStepOrCancel$;
	}

	public createInternalSlideLinkComponent(editedSlideId: number, alreadySelectedSlideId?: number | string): EventEmitter<number> {
		this.internalSlideLinkComponentRef = this.appViewContainerRef.createComponent(this.slideInternalSlideLinkComponentFactory);
		this.internalSlideLinkComponentRef.instance.editedSlideId = editedSlideId;

		if (alreadySelectedSlideId) {
			this.internalSlideLinkComponentRef.instance.alreadySelectedSlideId = alreadySelectedSlideId;
		}

		return this.internalSlideLinkComponentRef.instance.onSaveAction;
	}

	public createExternalLinkComponent(): Observable<string> {
		this.externalLinkComponentRef = this.appViewContainerRef.createComponent(this.externalLinkComponentComponentFactory);

		return merge(
			this.externalLinkComponentRef.instance.onSaveAction,
			this.externalLinkComponentRef.instance.onCancelAction,
		).pipe(
			first(),
			tap(() => this.clearViewContainerRef()),
			filter((actionResponse: string) => !!actionResponse),
			map((actionResponse: string) => {
				return actionResponse;
			}),
		)
	}

	public clearViewContainerRef(): void {
		this.appViewContainerRef.clear();
	}
}
