import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/modules/presentation-creator/presentation-creator.component';
import { PresentationListComponent } from 'src/app/modules/dashboard/modules/presentation-list/presentation-list.component';
import { PresentationViewerComponent } from 'src/app/modules/dashboard/modules/presentation-viewer/presentation-viewer.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent, children: [
			{ path: '', redirectTo: 'presentation-list', pathMatch: 'full' },
			{ path: 'presentation-list', component: PresentationListComponent },
			{ path: 'presentation-creator', component: PresentationCreatorComponent },
			{ path: 'presentation-viewer/:id', component: PresentationViewerComponent },
		],
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})
export class DashboardRoutingModule {
}
