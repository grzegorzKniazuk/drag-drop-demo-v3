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
import { SlideEditMenuBarComponent } from './components/slide/slide-edit/slide-edit-menu-bar/slide-edit-menu-bar.component';
import { SlideActionFormComponent } from './components/slide/slide-edit/slide-action-form/slide-action-form.component';
import { SlideActionAddFormComponent } from './components/slide/slide-edit/slide-action-form/slide-action-add-form/slide-action-add-form.component';
import { SlideActionEditFormComponent } from './components/slide/slide-edit/slide-action-form/slide-action-edit-form/slide-action-edit-form.component';
import { LinkSlideSelectorComponent } from './components/slide/slide-edit/link-slide-selector/link-slide-selector.component';
import { LinkPresentationSelectorComponent } from './components/slide/slide-edit/link-presentation-selector/link-presentation-selector.component';

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
		SlideActionFormComponent,
		SlideActionAddFormComponent,
		SlideActionEditFormComponent,
		LinkSlideSelectorComponent,
		LinkPresentationSelectorComponent,
	],
	entryComponents: [
		ColumnTitleComponent,
		SlideLightboxComponent,
		SlideActionFormComponent,
		SlideActionAddFormComponent,
		SlideActionEditFormComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentation-creator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
		EffectsModule.forFeature([ CreatorOptionsEffects, ColumnEffects, SlideEffects ]),
	],
	providers: [
		PresentationCreatorComponentFactoryService,
	],
})
export class PresentationCreatorModule {
}
