import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Slide, SlidePosition } from 'src/app/shared/interfaces';
import { DropZoneBase } from 'src/app/shared/utils/drop-zone.base';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { RemoveSlide, SwapSlideInTheDifferentColumns, SwapSlideInTheSameColumn, UpdateSlidePosition } from 'src/app/modules/dashboard/modules/presentation-creator/store/actions/slide.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Update } from '@ngrx/entity';
import { isNull, isNumber } from 'lodash';
import { REMOVE_SLIDE } from 'src/app/modules/dashboard/store/actions/library.actions';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@AutoUnsubscribe()
@Component({
	selector: 'app-slide',
	templateUrl: './slide-thumbnail.component.html',
	styleUrls: [ './slide-thumbnail.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends DropZoneBase implements OnChanges, OnDestroy {

	@Input() public slide: Slide;
	@Input() public position: SlidePosition;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private presentationCreatorComponentFactoryService: PresentationCreatorComponentFactoryService,
		private router: Router,
		store: Store<AppState>,
		ngZone: NgZone,
	) {
		super(store, ngZone);
	}

	private get isPositionOrderChanged(): boolean {
		return this.slide.position.order !== this.position.order || this.slide.position.column !== this.position.column;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.slide.position && this.isPositionOrderChanged) {
			this.store.dispatch(new UpdateSlidePosition({
				slide: {
					id: this.slide.id,
					changes: {
						position: this.position,
					},
				},
			}));
		}
	}

	ngOnDestroy() {
	}

	@HostListener('dragstart', [ '$event' ])
	public onDragStart(event: DragEvent): void {
		event.stopImmediatePropagation();

		event.dataTransfer.setData('string', JSON.stringify({
			sourceSlideId: this.slide.id,
			sourceSlidePosition: this.slide.position,
			sourceColumnId: this.slide.columnId,
		}));
	}

	@HostListener('drop', [ '$event' ])
	public onDrop(event: DragEvent): void {
		event.stopImmediatePropagation();

		this.isElementOnDragOver = false;

		const { sourceSlideId, sourceSlidePosition, sourceColumnId } = this.parseDataTransferFromDropEvent(event);

		if (sourceColumnId === this.slide.columnId && isNumber(sourceSlidePosition.column)) {
			this.swapSlideInTheSameColumn(sourceSlideId, sourceSlidePosition);
		} else if (sourceColumnId !== this.slide.columnId && isNumber(sourceSlidePosition.column)) {
			this.swapSlideInTheDifferentColumns(sourceSlideId, sourceColumnId, sourceSlidePosition);
		} else if (isNull(sourceSlidePosition.column) && sourceSlideId !== this.slide.id) {
			this.moveSlideFromLibraryToColumn(sourceSlideId, this.slide.columnId); // jesli slajd przenoszony z bibloteki do dodaj go na dół kolumny
		}
	}

	public onEditSlide(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.router.navigateByUrl(`/dashboard/presentation-creator/edit-slide/${this.slide.id}`);
	}

	public onRemoveSlide(event: MouseEvent): void {
		event.stopImmediatePropagation();

		if (isNumber(this.slide.columnId)) { // jesli usuwamy z prezentacji
			this.store.dispatch(new RemoveSlide({
				slideId: this.slide.id,
			}));
		} else if (isNull(this.slide.columnId)) { // jesli usuwamy z bibiloteki
			this.presentationCreatorComponentFactoryService.createDynamicComponent<boolean>(
				ConfirmDialogComponent,
				{
					header: 'Uwaga',
					message: 'Czy napewno chcesz usunąć ten slajd z biblioteki? Operacji nie można cofnąć',
				},
			).subscribe(() => {
				this.store.dispatch(new REMOVE_SLIDE({
					slideId: this.slide.id,
				}));
			});
		}
	}

	public showLightbox(event: MouseEvent): void {
		event.stopImmediatePropagation();

		this.presentationCreatorComponentFactoryService.createSlideLightboxComponent(this.slide.imageData).subscribe();
	}

	private swapSlideInTheSameColumn(sourceSlideId: number, sourceSlidePosition: SlidePosition): void {
		const sourceSlide: Update<Slide> = {
			id: sourceSlideId,
			changes: {
				position: this.position,
			},
		};

		const targetSlide: Update<Slide> = {
			id: this.slide.id,
			changes: {
				position: sourceSlidePosition,
			},
		};

		this.store.dispatch(new SwapSlideInTheSameColumn({
			slides: [ sourceSlide, targetSlide ],
		}));
	}

	private swapSlideInTheDifferentColumns(sourceSlideId: number, sourceColumnId: number, sourceSlidePosition: SlidePosition): void {
		const sourceSlide: Update<Slide> = {
			id: sourceSlideId,
			changes: {
				columnId: this.slide.columnId,
				position: this.position,
			},
		};

		const targetSlide: Update<Slide> = {
			id: this.slide.id,
			changes: {
				columnId: sourceColumnId,
				position: sourceSlidePosition,
			},
		};

		this.store.dispatch(new SwapSlideInTheDifferentColumns({
			slides: [ sourceSlide, targetSlide ],
		}));
	}
}
