import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectPresentationById } from 'src/app/modules/dashboard/modules/presentation-list/store/selectors/presentation-list.selectors';
import { first } from 'rxjs/operators';
import { Presentation } from 'src/app/shared/interfaces/presentation';

@Component({
	selector: 'app-presentation-viewer',
	templateUrl: './presentation-viewer.component.html',
	styleUrls: [ './presentation-viewer.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationViewerComponent implements OnInit, AfterViewInit {

	@ViewChild('canvas') private canvas: ElementRef;
	private context: CanvasRenderingContext2D;
	public presentation: Presentation;

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
	) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.initCanvasContext();
		this.fetchPresentation();
	}

	private initCanvasContext(): void {
		this.context = this.canvas.nativeElement.getContext('2d');
	}

	private fetchPresentation(): void {
		const presentationId = +this.activatedRoute.snapshot.paramMap.get('id');

		this.store.pipe(
			select(selectPresentationById, { id: presentationId }),
			first(),
		).subscribe((presentation: Presentation) => {
			this.presentation = presentation;
		});
	}
}
