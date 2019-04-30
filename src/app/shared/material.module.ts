import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

const materialModules = [
	ScrollingModule,
];

@NgModule({
	imports: [
		...materialModules,
	],
	exports: [
		...materialModules,
	],
})
export class MaterialModule {
}
