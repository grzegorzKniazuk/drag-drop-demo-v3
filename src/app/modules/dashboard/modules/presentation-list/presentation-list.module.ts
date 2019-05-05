import { NgModule } from '@angular/core';
import { PresentationListComponent } from './presentation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { presentationListReducer } from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';
import { PresentationListEffects } from 'src/app/modules/dashboard/modules/presentation-list/store/effects/presentation-list.effects';
import { PresentationThumbnailComponent } from './components/presentation-thumbnail/presentation-thumbnail.component';
import { PresentationViewerComponent } from 'src/app/modules/dashboard/modules/presentation-list/components/presentation-viewer/presentation-viewer.component';

@NgModule({
	declarations: [
		PresentationListComponent,
		PresentationThumbnailComponent,
		PresentationViewerComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentation-list', presentationListReducer),
		EffectsModule.forFeature([ PresentationListEffects ]),
	],
})
export class PresentationListModule {
}
