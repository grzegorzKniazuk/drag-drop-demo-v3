import { NgModule } from '@angular/core';
import { PresentationViewerComponent } from './presentation-viewer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		PresentationViewerComponent,
	],
	imports: [
		SharedModule,
	],
})
export class PresentationViewerModule {
}
