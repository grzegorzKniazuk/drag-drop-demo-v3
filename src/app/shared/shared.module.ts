import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { SlideThumbnailComponent } from 'src/app/shared/components/slide-thumbnail/slide-thumbnail.component';
import { ColumnComponent } from 'src/app/shared/components/column/column.component';
import { SlideLibraryDividerComponent } from 'src/app/shared/components/slide-library-divider/slide-library-divider.component';

const components = [
	SlideThumbnailComponent,
	ColumnComponent,
	SlideLibraryDividerComponent,
];

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
