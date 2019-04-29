import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SlideLightboxImageData } from 'src/app/shared/interfaces/slide-lightbox-image-data';
import { Lightbox } from 'primeng/primeng';

@Component({
	selector: 'app-slide-lightbox',
	templateUrl: './slide-lightbox.component.html',
	styleUrls: [ './slide-lightbox.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideLightboxComponent implements AfterViewInit {

	public slides: SlideLightboxImageData[] = [];
	@ViewChild(Lightbox) private lightbox: Lightbox;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
	) {
	}

	ngAfterViewInit() {
		this.lightbox.el.nativeElement.children[0].children[0].children[0].click();
		this.changeDetectorRef.detectChanges();
	}
}
