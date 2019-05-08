import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Slide } from 'src/app/shared/interfaces/slide';
import { demoSlide1 } from 'src/app/shared/utils/demo-slides';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Coordinates } from 'src/app/shared/interfaces/coordinates';
import { SlideLinkActionParams } from 'src/app/shared/interfaces/slide-link-action-params';
import { CursorTypes } from 'src/app/shared/enums/cursor-types';
import { ComponentFactoryBaseService } from 'src/app/shared/services/component-factory-base.service';
import { filter, first } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';
import { SlideActionTypes } from 'src/app/shared/enums/slide-action-types';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide-edit',
	templateUrl: './slide-edit.component.html',
	styleUrls: [ './slide-edit.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditComponent implements OnInit, OnDestroy {

	public readonly slideLinkActionContainerCssClass = 'slide-link-action-container';
	@ViewChild('canvasElement') private readonly canvasElement: ElementRef;
	@ViewChild('backgroundElement') private readonly backgroundElement: ElementRef;
	private slide: Slide;
	private element: HTMLDivElement | null = null;
	private startCords: Coordinates;
	private endCords: Coordinates;
	private slideLinkActionsParams: SlideLinkActionParams[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private title: Title,
		private renderer2: Renderer2,
		private toastService: ToastService,
		private ngZone: NgZone,
		private componentFactoryBaseService: ComponentFactoryBaseService,
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
		private changeDetectorRef: ChangeDetectorRef,
	) {
	}

	private get slideLinkActionComponentPositionStyle(): { [key: string]: string } {
		return {
			'top': this.top,
			'left': this.left,
			'width': this.width,
			'height': this.height,
		};
	}

	private get top(): string {
		return (this.endCords.y - this.startCords.y < 0) ? this.endCords.y + '%' : this.startCords.y + '%';
	}

	private get left(): string {
		return (this.endCords.x - this.startCords.x < 0) ? this.endCords.x + '%' : this.startCords.x + '%';
	}

	private get width(): string {
		return `${Math.abs(this.endCords.x - this.startCords.x)}%`;
	}

	private get height(): string {
		return `${Math.abs(this.endCords.y - this.startCords.y)}%`;
	}

	ngOnInit() {
		this.initTitle();
		this.fetchSlide();
		this.showOpeningToast();
	}

	ngOnDestroy() {
	}

	public onClick(event: MouseEvent): void {
		if (this.element) {
			this.removeDrawnDivElement();
			this.setCursor(CursorTypes.DEFAULT);
			this.addSlideLinkActionComponentToArray();
		} else {
			this.createDivElement(event);
			this.setCursor(CursorTypes.CROSSHAIR);
		}
	}

	public onMouseMove(event: MouseEvent): void {
		this.ngZone.runOutsideAngular(() => {
			if (this.element) {
				this.endCords = this.getPercentageCursorPosition(this.getCursorPosition(event));
				this.drawDivElement();
			}
		});
	}

	public removeSlideLinkAction(linkActionId: number): void {
		this.componentFactoryBaseService.createConfirmDialogComponent(
			'Uwaga',
			'Czy napewno chcesz usunąć tą akcję? Operacji nie można cofnąć',
		).onAcceptOrConfirm$.pipe(
			first(),
		).subscribe((isAccepted: boolean) => {
			if (isAccepted) {
				this.slideLinkActionsParams = this.slideLinkActionsParams.filter((actionParams) => {
					return actionParams.id !== linkActionId;
				});
				this.changeDetectorRef.detectChanges();
			}
		});
	}

	private initTitle(): void {
		this.title.setTitle('Edycja slajdu');
	}

	private fetchSlide(): void {
		const slideId = +this.activatedRoute.snapshot.paramMap.get('id');

		this.slide = demoSlide1;
		this.setBackgroundImage(this.slide.imageData);
		/*
		this.store.pipe(
			select(selectSlidesById, { slideId }),
			first(),
		).subscribe((slide: Slide) => {
			this.slide = slide;
			this.setBackgroundImage(this.slide.imageData);
		});
		*/
	}

	private showOpeningToast(): void {
		this.toastService.information('Kliknij, aby zaznaczyć obszar na slajdzie i dodać do niego akcję');
	}

	private setBackgroundImage(imageData: string | ArrayBuffer) {
		this.renderer2.setAttribute(this.backgroundElement.nativeElement, 'src', <string> imageData);
	}

	private createDivElement(event: MouseEvent): void {
		this.startCords = this.getPercentageCursorPosition(this.getCursorPosition(event));

		this.element = this.renderer2.createElement('div');
		this.renderer2.addClass(this.element, this.slideLinkActionContainerCssClass);
		this.renderer2.setStyle(this.element, 'left', `${this.startCords.x}%`);
		this.renderer2.setStyle(this.element, 'top', `${this.startCords.y}%`);
		this.renderer2.appendChild(this.canvasElement.nativeElement, this.element);
	}

	private removeDrawnDivElement(): void {
		this.renderer2.removeChild(this.canvasElement.nativeElement, this.element);
		this.element = null;
	}

	private setCursor(cursorType: CursorTypes): void {
		this.renderer2.setStyle(this.canvasElement.nativeElement, 'cursor', cursorType);
	}

	private addSlideLinkActionComponentToArray(): void {
		this.presentationCreatorComponentFactoryService.createSlideSelectNewActionTypeComponent()
		.pipe(
			first(),
			filter((nextStepAction: SlideActionTypes) => !!nextStepAction),
		)
		.subscribe((actionType: SlideActionTypes) => {
			if (actionType === SlideActionTypes.INTERNAL_SLIDE_LINK) {
				this.presentationCreatorComponentFactoryService.createInternalSlideLinkComponent(this.slide.id);
			}
			this.slideLinkActionsParams.push({
				id: this.slideLinkActionsParams.length,
				type: actionType,
				style: this.slideLinkActionComponentPositionStyle,
			});
		});
	}

	private drawDivElement(): void {
		this.renderer2.setStyle(this.element, 'width', this.width);
		this.renderer2.setStyle(this.element, 'height', this.height);
		this.renderer2.setStyle(this.element, 'left', this.left);
		this.renderer2.setStyle(this.element, 'top', this.top);
	}

	private getCursorPosition(event: MouseEvent): Coordinates {
		const rect = this.canvasElement.nativeElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		return { x, y };
	}

	private getPercentageCursorPosition(cords: Coordinates): Coordinates {
		return { x: this.toPercentageX(cords.x), y: this.toPercentageY(cords.y) };
	}

	private toPercentageX(x: number): number {
		return (x / this.canvasElement.nativeElement.offsetWidth) * 100;
	}

	private toPercentageY(y: number): number {
		return (y / this.canvasElement.nativeElement.offsetHeight) * 100;
	}
}
