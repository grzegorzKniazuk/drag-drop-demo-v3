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
import { AddMoreSlidesComponent } from './components/library-bar/add-more-slides/add-more-slides.component';
import { EditorMenuBarComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/editor-menu-bar/editor-menu-bar.component';
import { CreatorOptionsEffects } from './store/effects/creator-options.effects';
import { SlideEditComponent } from './components/slide/slide-edit/slide-edit.component';
import { SlideEditMenuBarComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/slide-edit-menu-bar/slide-edit-menu-bar.component';
import { SlideSelectNewActionTypeComponent } from './components/slide/slide-edit/components/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from './components/slide/slide-edit/components/internal-slide-link/internal-slide-link.component';
import { SlideLinkThumbnailComponent } from './components/slide/slide-edit/components/internal-slide-link/slide-link-thumbnail/slide-link-thumbnail.component';
import { InternalSlideLinkService } from 'src/app/modules/dashboard/modules/presentation-creator/services/internal-slide-link.service';

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
		AddMoreSlidesComponent,
		EditorMenuBarComponent,
		SlideEditComponent,
		SlideEditMenuBarComponent,
		SlideSelectNewActionTypeComponent,
		InternalSlideLinkComponent,
		SlideLinkThumbnailComponent,
	],
	entryComponents: [
		ColumnTitleComponent,
		SlideLightboxComponent,
		SlideSelectNewActionTypeComponent,
		InternalSlideLinkComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentation-creator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
		EffectsModule.forFeature([ CreatorOptionsEffects, ColumnEffects, SlideEffects ]),
	],
	providers: [
		PresentationCreatorComponentFactoryService,
		InternalSlideLinkService,
	],
})
export class PresentationCreatorModule {
}
