import { NgModule } from '@angular/core';
import { PresentationEditorComponent } from 'src/app/modules/dashboard/modules/presentation-editor/presentation-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPresentationCreator from './store';
import { LibraryBarComponent } from './components/library-bar/library-bar.component';
import { ColumnEffects, CreatorOptionsEffects, SlideEffects } from 'src/app/modules/dashboard/modules/presentation-editor/store/effects';
import { ColumnComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/column/column.component';
import { EditorMenuBarComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/editor-menu-bar/editor-menu-bar.component';
import { InternalSlideLinkService } from 'src/app/modules/dashboard/modules/presentation-editor/services/internal-slide-link.service';
import { SlideThumbnailComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-thumbnail/slide-thumbnail.component';
import { SlideLibraryDividerComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/library-bar/slide-library-divider/slide-library-divider.component';
import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/column/column-title/column-title.component';
import { SlideColumnDividerComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-column-divider/slide-column-divider.component';
import { ColumnDividerComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/column/column-divider/column-divider.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-lightbox/slide-lightbox.component';
import { AddMoreSlidesComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/library-bar/add-more-slides/add-more-slides.component';
import { SlideEditComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-edit.component';
import { SlideEditMenuBarComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-edit-menu-bar/slide-edit-menu-bar.component';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/internal-slide/internal-slide-link/internal-slide-link.component';
import { SlideLinkThumbnailComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/internal-slide/slide-link-thumbnail/slide-link-thumbnail.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/external-link/external-link.component';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';

@NgModule({
	declarations: [
		PresentationEditorComponent,
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
		ExternalLinkComponent,
	],
	entryComponents: [
		ColumnTitleComponent,
		SlideLightboxComponent,
		SlideSelectNewActionTypeComponent,
		InternalSlideLinkComponent,
		ExternalLinkComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature(StoreFeatureNames.PRESENTATION_EDITOR, fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
		EffectsModule.forFeature([ CreatorOptionsEffects, ColumnEffects, SlideEffects ]),
	],
	providers: [
		InternalSlideLinkService,
		ComponentFactoryService,
	],
})
export class PresentationEditorModule {
}
