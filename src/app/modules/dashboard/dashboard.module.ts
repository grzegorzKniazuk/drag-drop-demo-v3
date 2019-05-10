import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store';
import { PresentationEditorModule } from 'src/app/modules/dashboard/modules/presentation-editor/presentation-editor.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { PresentationListModule } from 'src/app/modules/dashboard/modules/presentation-list/presentation-list.module';
import { LibraryEffects } from 'src/app/modules/dashboard/store/effects/library.effects';
import { StoreFeatureNames } from 'src/app/shared/enums/store-feature-names';

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		SharedModule,
		DashboardRoutingModule,
		PresentationEditorModule,
		PresentationListModule,
		StoreModule.forFeature(StoreFeatureNames.DASHBOARD, fromDashboard.reducers, { metaReducers: fromDashboard.metaReducers }),
		EffectsModule.forFeature([ LibraryEffects ]),
	],
})
export class DashboardModule {
}
