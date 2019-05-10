import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Slide, SlideActionParams } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services/toast.service';
import { first } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { selectSlidesById } from 'src/app/modules/dashboard/modules/presentation-editor/store/selectors';
import { UpdateSlideActions } from 'src/app/modules/dashboard/modules/presentation-editor/store/actions';
import { DrawZoneBase } from 'src/app/shared/utils/draw-zone.base';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/internal-slide/internal-slide-link/internal-slide-link.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/external-link/external-link.component';
import { ExternalPresentationLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/external-presentation/external-presentation-link/external-presentation-link.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide-edit',
	templateUrl: './slide-edit.component.html',
	styleUrls: [ './slide-edit.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditComponent extends DrawZoneBase implements OnInit, OnDestroy {

	private slide: Slide;
	private slideActions: SlideActionParams[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private componentFactoryService: ComponentFactoryService,
		private changeDetectorRef: ChangeDetectorRef,
		title: Title,
		renderer2: Renderer2,
		toastService: ToastService,
		ngZone: NgZone,
	) {
		super(ngZone, renderer2, toastService, title);
	}

	ngOnInit() {
		this.initTitle();
		this.fetchSlide();
		this.showOpeningToast();
	}

	ngOnDestroy() {
	}

	public removeSlideAction(actionId: number): void {
		this.componentFactoryService.createDynamicComponent<boolean>(
			ConfirmDialogComponent, {
				header: 'Uwaga',
				message: 'Czy na pewno chcesz usunąć tą akcję? Operacji nie można cofnąć',
			})
		    .subscribe(() => {
			    this.slideActions = this.slideActions.filter((actionParams) => actionParams.id !== actionId);
			    this.changeDetectorRef.detectChanges();
		    });
	}

	public editSlideAction(actionId: number): void {
		const actionToEdit = this.slideActions.find((action: SlideActionParams) => action.id === actionId);

		this.initEditSlideAction(actionToEdit);
	}

	public onSlideChangesSave(): void {
		this.store.dispatch(new UpdateSlideActions({
			slide: {
				id: this.slide.id,
				changes: {
					actions: this.slideActions,
				},
			},
		}));
	}

	public onClick(event: MouseEvent): void {
		if (this.element) {
			this.removeDrawnDivElement();
			this.setCursor(CursorTypes.DEFAULT);
			this.initNewSlideAction();
		} else {
			this.createDivElement(event);
			this.setCursor(CursorTypes.CROSSHAIR);
		}
	}

	private fetchSlide(): void {
		const slideId = +this.activatedRoute.snapshot.paramMap.get('id');

		this.store.pipe(
			select(selectSlidesById, { slideId }),
			first(),
		).subscribe((slide: Slide) => {
			this.slide = slide;
			if (this.slide && this.slideActions) {
				this.slideActions.push(...this.slide.actions);
			}
			this.setBackgroundImage(this.slide.imageData);
		});
	}

	private initEditSlideAction(actionToEdit: SlideActionParams): void {
		this.componentFactoryService.createDynamicComponent<string>(
			SlideSelectNewActionTypeComponent, {
				selectedActionType: actionToEdit.type,
			})
		    .subscribe((actionType: SlideActionTypes) => {
			    if (actionType === SlideActionTypes.INTERNAL_SLIDE_LINK) {
				    this.createInternalSlideLinkComponent(actionType, actionToEdit.target);
			    } else if (actionType === SlideActionTypes.EXTERNAL_WEB_LINK) {
				    this.createExternalLinkComponent(actionType, <string>actionToEdit.target);
			    } else if (actionType === SlideActionTypes.EXTERNAL_PRESENTATION_LINK) {
				    this.createExternalPresentationLinkComponent(actionType, actionToEdit.target);
			    }
		    });
	}

	private initNewSlideAction(): void {
		this.componentFactoryService.createDynamicComponent(SlideSelectNewActionTypeComponent)
		    .subscribe((actionType: SlideActionTypes) => {
			    if (actionType === SlideActionTypes.INTERNAL_SLIDE_LINK) {
				    this.createInternalSlideLinkComponent(actionType);
			    } else if (actionType === SlideActionTypes.EXTERNAL_WEB_LINK) {
				    this.createExternalLinkComponent(actionType);
			    } else if (actionType === SlideActionTypes.EXTERNAL_PRESENTATION_LINK) {
				    this.createExternalPresentationLinkComponent(actionType);
			    }
		    });
	}

	private createExternalLinkComponent(actionType: SlideActionTypes, alreadySelectedExternalLink?: string): void {
		this.componentFactoryService.createDynamicComponent<string>(
			ExternalLinkComponent, {
				link: alreadySelectedExternalLink,
			})
		    .subscribe((externalLink: string) => {
			    this.addActionToArray(externalLink, actionType);
		    });
	}

	private createExternalPresentationLinkComponent(actionType: SlideActionTypes, alreadySelectedPresenationId?: number | string): void {
		this.componentFactoryService.createDynamicComponent<number>(
			ExternalPresentationLinkComponent, {
				editedPresentationId: this.slide.presentationId,
				alreadySelectedPresenationId: alreadySelectedPresenationId,
			})
		    .subscribe((selectedPresentationId) => {
			    this.addActionToArray(selectedPresentationId, actionType);
		    });
	}

	private createInternalSlideLinkComponent(actionType: SlideActionTypes, alreadySelectedSlideId?: number | string): void {
		this.componentFactoryService.createDynamicComponent<number>(
			InternalSlideLinkComponent, {
				editedSlideId: this.slide.id,
				alreadySelectedSlideId: alreadySelectedSlideId,
			})
		    .subscribe((selectedSlideId: number) => {
			    this.addActionToArray(selectedSlideId, actionType);
		    });
	}

	private addActionToArray(target: number | string, actionType: SlideActionTypes): void {
		const slideAction = {
			id: this.slideActions.length,
			type: actionType,
			target: target,
			style: this.slideLinkActionComponentPositionStyle,
		};

		this.slideActions.push(slideAction);
		this.changeDetectorRef.markForCheck();
		this.toastService.success('Dodano akcję');
	}
}
