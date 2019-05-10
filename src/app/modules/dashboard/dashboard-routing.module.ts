import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PresentationEditorComponent } from 'src/app/modules/dashboard/modules/presentation-editor/presentation-editor.component';
import { PresentationListComponent } from 'src/app/modules/dashboard/modules/presentation-list/presentation-list.component';
import { PresentationViewerComponent } from 'src/app/modules/dashboard/modules/presentation-list/components/presentation-viewer/presentation-viewer.component';
import { SlideEditComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-edit.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent, children: [
			{ path: '', redirectTo: 'presentation-list', pathMatch: 'full' },
			{ path: 'presentation-list', component: PresentationListComponent },
			{ path: 'presentation-viewer/:id', component: PresentationViewerComponent },
			{ path: 'presentation-editor', component: PresentationEditorComponent },
			{ path: 'presentation-editor/slide/:id', component: SlideEditComponent },
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
