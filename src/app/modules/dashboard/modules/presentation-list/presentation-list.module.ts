import { NgModule } from '@angular/core';
import { PresentationListComponent } from './presentation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { presentationListReducer } from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';
import { PresentationListEffects } from 'src/app/modules/dashboard/modules/presentation-list/store/effects/presentation-list.effects';
import { PresentationThumbnailComponent } from './components/presentation-thumbnail/presentation-thumbnail.component';
import { PresentationViewerComponent } from 'src/app/modules/dashboard/modules/presentation-list/components/presentation-viewer/presentation-viewer.component';
import { ListMenuBarComponent } from './components/list-menu-bar/list-menu-bar.component';
import { PresentationEditorModule } from 'src/app/modules/dashboard/modules/presentation-editor/presentation-editor.module';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';

@NgModule({
	declarations: [
		PresentationListComponent,
		PresentationThumbnailComponent,
		PresentationViewerComponent,
		ListMenuBarComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature(StoreFeatureNames.PRESENTATION_LIST, presentationListReducer),
		EffectsModule.forFeature([ PresentationListEffects ]),
		PresentationEditorModule,
	],
})
export class PresentationListModule {
}
