import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Slide } from 'src/app/shared/interfaces/slide';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SlideActionParams } from 'src/app/shared/interfaces/slide-action-params';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { first, tap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';
import { selectSlidesById } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/slide.selector';
import { UpdateSlideActions } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { DrawZoneBase } from 'src/app/shared/utils/draw-zone.base';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';

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
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
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
		this.presentationCreatorComponentFactoryService.createConfirmDialogComponent(
			'Uwaga',
			'Czy napewno chcesz usunąć tą akcję? Operacji nie można cofnąć',
		).subscribe(() => {
			this.slideActions = this.slideActions.filter((actionParams) => {
				return actionParams.id !== actionId;
			});
			this.changeDetectorRef.detectChanges();
		});
	}

	public editSlideAction(actionId: number): void {
		const actionToEdit = this.slideActions.find((action: SlideActionParams) => {
			return action.id === actionId;
		});

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
		this.presentationCreatorComponentFactoryService.createSlideSelectActionTypeComponent(actionToEdit.type)
		    .subscribe((actionType: SlideActionTypes) => {
			    if (actionType === SlideActionTypes.INTERNAL_SLIDE_LINK) {
				    this.createInternalSlideLinkComponent(actionType, actionToEdit.target);
			    } else if (actionType === SlideActionTypes.EXTERNAL_WEB_LINK) {

			    }
		    });
	}

	private initNewSlideAction(): void {
		this.presentationCreatorComponentFactoryService.createSlideSelectActionTypeComponent()
		    .subscribe((actionType: SlideActionTypes) => {
			    if (actionType === SlideActionTypes.INTERNAL_SLIDE_LINK) {
				    this.createInternalSlideLinkComponent(actionType);
			    } else if (actionType === SlideActionTypes.EXTERNAL_WEB_LINK) {
				    this.createExternalLinkComponent(actionType);
			    }
		    });
	}

	private createExternalLinkComponent(actionType: SlideActionTypes): void {
		this.presentationCreatorComponentFactoryService.createExternalLinkComponent()
		    .subscribe((externalLink: string) => {
			    console.log(externalLink);
		    });
	}

	private createInternalSlideLinkComponent(actionType: SlideActionTypes, alreadySelectedSlideId?: number | string): void {
		this.presentationCreatorComponentFactoryService.createInternalSlideLinkComponent(this.slide.id, alreadySelectedSlideId)
		    .subscribe((selectedSlideId: number) => {
			    this.addActionToArray(selectedSlideId, actionType);
		    });
	}

	private addActionToArray(target: number, actionType: SlideActionTypes): void {
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
