import { createSelector } from '@ngrx/store';
import { Slide } from 'src/app/shared/interfaces/slide';
import { selectSlidesState } from 'src/app/modules/dashboard/modules/presentation-creator/store/selectors/module-base.selectors';
import * as slideEntitySelectors from 'src/app/modules/dashboard/modules/presentation-creator/store/reducers/slide.reducer';

export const selectSlides = createSelector(
	selectSlidesState,
	slideEntitySelectors.selectAll,
);

export const selectSlidesById = createSelector(
	selectSlides,
	((slides: Slide[], props: { slideId: number }) => {
		return slides.find((slide: Slide) => {
			return slide.id === props.slideId;
		});
	}),
);

export const selectColumnSlidesById = createSelector(
	selectSlides,
	(slides: Slide[], props: { columnId: number }) => {
		return slides.filter((slide: Slide) => {
			return slide.columnId === props.columnId;
		});
	},
);

export const selectColumnSlidesIdsByColumnId = createSelector(
	selectColumnSlidesById,
	(slides: Slide[]) => slides.map((slide: Slide) => {
		return slide.id;
	}),
);

export const selectAmountOfSlidesInColumnById = createSelector(
	selectSlides,
	(slides: Slide[], props: { columnId: number }) => {
		return slides.filter((slide: Slide) => {
			return slide.columnId === props.columnId;
		}).length;
	},
);
