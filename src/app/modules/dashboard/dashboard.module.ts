import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store';
import { PresentationCreatorModule } from 'src/app/modules/dashboard/modules/presentation-creator/presentation-creator.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		SharedModule,
		DashboardRoutingModule,
		StoreModule.forFeature('dashboard', fromDashboard.reducers, { metaReducers: fromDashboard.metaReducers }),
		EffectsModule.forFeature([]),
		PresentationCreatorModule,
	],
})
export class DashboardModule {
}
