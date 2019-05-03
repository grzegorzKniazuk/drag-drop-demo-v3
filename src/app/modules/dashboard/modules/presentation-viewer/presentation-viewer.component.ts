import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
	selector: 'app-presentation-viewer',
	templateUrl: './presentation-viewer.component.html',
	styleUrls: [ './presentation-viewer.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationViewerComponent implements OnInit, AfterViewInit {

	@ViewChild('canvas') private canvas: ElementRef;
	private context: CanvasRenderingContext2D;

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
		const presentationId = this.activatedRoute.snapshot.paramMap.get('id');
	}
}
