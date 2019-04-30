import { NgModule } from '@angular/core';
import { PresentationListComponent } from './presentation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		PresentationListComponent,
	],
	imports: [
		SharedModule,
	],
})
export class PresentationListModule {
}
