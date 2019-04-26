import { createSelector } from '@ngrx/store';
import * as libraryEntitySelectors from 'src/app/modules/dashboard/store/reducers/library.reducer';
import { selectLibraryState } from 'src/app/modules/dashboard/store/selectors/dashboard.selectors';
import { Slide } from 'src/app/shared/interfaces/slide';


export const selectLibrarySlidesAmount = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectTotal,
);

export const selectLibrarySlides = createSelector(
	selectLibraryState,
	libraryEntitySelectors.selectAll,
);

export const selectSlideFromLibraryById = createSelector(
	selectLibrarySlides,
	(slides: Slide[], props: { id: number }) => {
		return slides.find((slide: Slide) => {
			return slide.id === props.id;
		});
	}
);


