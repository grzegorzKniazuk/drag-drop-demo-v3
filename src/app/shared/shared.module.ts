import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';

const components = [];

const entryComponents = [];

const directives = [];

const modules = [
	CommonModule,
	PrimeNgModule,
];

@NgModule({
	declarations: [
		...components,
		...directives,
	],
	entryComponents: [
		...entryComponents,
	],
	imports: [
		...modules,
	],
	exports: [
		...modules,
		...components,
		...directives,
	],
})
export class SharedModule {
}
