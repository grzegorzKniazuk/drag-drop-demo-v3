import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

const materialModules = [
	ScrollingModule,
	DragDropModule,
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
