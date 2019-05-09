import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/slide-select-new-action-type/slide-select-new-action-type.component';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/internal-slide/internal-slide-link/internal-slide-link.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/external-link/external-link.component';
import { Observable } from 'rxjs';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';

@Injectable()
export class PresentationCreatorComponentFactoryService extends ComponentFactoryBaseService {

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

	constructor(
		applicationRef: ApplicationRef,
		componentFactoryResolver: ComponentFactoryResolver,
	) {
		super(applicationRef, componentFactoryResolver);
	}

	public createColumnTitleComponent(): Observable<string> {
		this.columnTitleComponentRef = this.appViewContainerRef.createComponent(this.columnTitleComponentFactory);

		return this.mergeActions<string>(this.columnTitleComponentRef);
	}

	public createSlideLightboxComponent(imageData: string | ArrayBuffer): Observable<void> {
		this.slideLightboxComponentRef = this.appViewContainerRef.createComponent(this.slideLightboxComponentFactory);
		this.slideLightboxComponentRef.instance.imageData = imageData;

		return this.mergeActions<void>(this.slideLightboxComponentRef);
	}

	public createSlideSelectActionTypeComponent(alreadySelectedActionType?: SlideActionTypes): Observable<string> {
		this.slideSelectActionTypeComponentRef = this.appViewContainerRef.createComponent(this.slideSelectNewActionTypeComponentFactory);

		if (alreadySelectedActionType) {
			this.slideSelectActionTypeComponentRef.instance.selectedActionType = alreadySelectedActionType;
		}

		return this.mergeActions<string>(this.slideSelectActionTypeComponentRef);
	}

	public createInternalSlideLinkComponent(editedSlideId: number, alreadySelectedSlideId?: number | string): Observable<number> {
		this.internalSlideLinkComponentRef = this.appViewContainerRef.createComponent(this.slideInternalSlideLinkComponentFactory);
		this.internalSlideLinkComponentRef.instance.editedSlideId = editedSlideId;

		if (alreadySelectedSlideId) {
			this.internalSlideLinkComponentRef.instance.alreadySelectedSlideId = alreadySelectedSlideId;
		}

		return this.mergeActions<number>(this.internalSlideLinkComponentRef);
	}

	public createExternalLinkComponent(): Observable<string> {
		this.externalLinkComponentRef = this.appViewContainerRef.createComponent(this.externalLinkComponentComponentFactory);

		return this.mergeActions<string>(this.externalLinkComponentRef);
	}
}
