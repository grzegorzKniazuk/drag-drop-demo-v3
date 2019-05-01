import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule' },
	{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, {
		// enableTracing: true,
	}) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {
}
