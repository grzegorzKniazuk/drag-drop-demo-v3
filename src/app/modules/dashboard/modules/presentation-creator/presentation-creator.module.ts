import { NgModule } from '@angular/core';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/modules/presentation-creator/presentation-creator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPresentationCreator from './store';
import { LibraryBarComponent } from './components/library-bar/library-bar.component';
import { ColumnEffects } from 'src/app/modules/dashboard/modules/presentation-creator/store/effects/column.effects';
import { SlideEffects } from 'src/app/modules/dashboard/modules/presentation-creator/store/effects/slide.effects';

@NgModule({
	declarations: [
		PresentationCreatorComponent,
		LibraryBarComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentationCreator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
		EffectsModule.forFeature([ ColumnEffects, SlideEffects ]),
	],
})
export class PresentationCreatorModule {
}
