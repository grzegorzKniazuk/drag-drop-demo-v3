import { NgModule } from '@angular/core';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/modules/presentation-creator/presentation-creator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPresentationCreator from './store';
import { LibraryBarComponent } from './components/library-bar/library-bar.component';
import { ColumnEffects } from 'src/app/modules/dashboard/modules/presentation-creator/store/effects/column.effects';
import { SlideEffects } from 'src/app/modules/dashboard/modules/presentation-creator/store/effects/slide.effects';
import { SlideThumbnailComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-thumbnail/slide-thumbnail.component';
import { ColumnComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideColumnDividerComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-column-divider/slide-column-divider.component';
import { ColumnDividerComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-divider/column-divider.component';
import { SlideLibraryDividerComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/library-bar/slide-library-divider/slide-library-divider.component';
import { PresentationCreatorComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-creator/services/presentation-creator-component-factory.service';

@NgModule({
	declarations: [
		PresentationCreatorComponent,
		LibraryBarComponent,
		SlideThumbnailComponent,
		ColumnComponent,
		SlideLibraryDividerComponent,
		ColumnTitleComponent,
		SlideColumnDividerComponent,
		ColumnDividerComponent,
		SlideLightboxComponent,
	],
	entryComponents: [
		ColumnTitleComponent,
		SlideLightboxComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentationCreator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
		EffectsModule.forFeature([ ColumnEffects, SlideEffects ]),
	],
	providers: [
		PresentationCreatorComponentFactoryService,
	],
})
export class PresentationCreatorModule {
}
