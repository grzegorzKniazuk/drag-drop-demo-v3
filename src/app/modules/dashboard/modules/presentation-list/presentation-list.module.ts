import { NgModule } from '@angular/core';
import { PresentationListComponent } from './presentation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PresentationTitleComponent } from './components/presentation-title/presentation-title.component';
import { PresentationListComponentFactoryService } from 'src/app/modules/dashboard/modules/presentation-list/services/presentation-list-component-factory.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { presentationListReducer } from 'src/app/modules/dashboard/modules/presentation-list/store/reducers/presentation-list.reducer';

@NgModule({
	declarations: [
		PresentationListComponent,
		PresentationTitleComponent,
	],
	entryComponents: [
		PresentationTitleComponent,
	],
	imports: [
		SharedModule,
		StoreModule.forFeature('presentation-list', presentationListReducer),
		EffectsModule.forFeature([]),
	],
	providers: [
		PresentationListComponentFactoryService,
	],
})
export class PresentationListModule {
}
