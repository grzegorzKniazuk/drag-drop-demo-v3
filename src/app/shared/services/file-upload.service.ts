import { Injectable } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ADD_SLIDES } from 'src/app/modules/dashboard/store/actions/library.actions';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {

	protected files: FileList;
	protected slides: Slide[] = [];

	constructor(
		private store: Store<AppState>,
		private toastService: ToastService,
	) {
	}

	private get generateLibrarySlideId(): number {
		return Math.floor((Math.random() * 10000000) + 1);
	}

	public uploadFiles(event: any): void {
		this.files = event.target.files || event.dataTransfer.files;

		this.prepareSlides()
		    .then((slides: Slide[]) => {
			    this.store.dispatch(new ADD_SLIDES({ slides }));
		    })
		    .finally(() => {
			    this.slides = [];
		    });
	}

	private prepareSlides(): Promise<Slide[]> {
		return new Promise<Slide[]>(((resolve) => {
			for (let i = 0; i < this.files.length; i++) {
				if (this.files.item(i).type.match('image')) {
					const fileReader = new FileReader();

					fileReader.readAsDataURL(this.files.item(i));

					fileReader.onloadend = () => {
						const imageBuffer = fileReader.result;

						this.slides.push({
							id: this.generateLibrarySlideId,
							presentationId: null,
							columnId: null,
							position: {
								column: null,
								order: null,
							},
							imageData: imageBuffer,
							actions: [],
						});

						if (i + 1 === this.files.length) {
							resolve(this.slides);
						}
					};
				} else {
					this.toastService.error('Wrzucony plik nie jest grafiką');
				}
			}
		}));
	}
}
