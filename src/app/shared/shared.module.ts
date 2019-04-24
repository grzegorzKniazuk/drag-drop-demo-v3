import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const components = [];

const entryComponents = [];

const directives = [];

const modules = [
	CommonModule,
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
