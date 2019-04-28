import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from 'src/app/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterErrorHandler } from 'src/app/shared/utils/router.error-handler';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		AppRoutingModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		environment.production ? [] : [ StoreDevtoolsModule.instrument() ],
	],
	providers: [
		// { provide: ErrorHandler, useClass: RouterErrorHandler },
	],
	bootstrap: [ AppComponent ],
})
export class AppModule {
}
