import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'lodash';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
                        .then((appRef: any) => enableDebugTools(appRef)) // wymagane do pomiarów wydajności
                        .catch(err => console.error(err));

// ng.profiler.timeChangeDetection();
// ng.profiler.timeChangeDetection({record: true});
