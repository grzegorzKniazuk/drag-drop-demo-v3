import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { SlideThumbnailComponent } from 'src/app/shared/components/slide/slide-thumbnail/slide-thumbnail.component';
import { ColumnComponent } from 'src/app/shared/components/column/column.component';
import { SlideLibraryDividerComponent } from 'src/app/shared/components/slide/slide-library-divider/slide-library-divider.component';
import { ColumnTitleComponent } from 'src/app/shared/components/column/column-title/column-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideColumnDividerComponent } from 'src/app/shared/components/slide/slide-column-divider/slide-column-divider.component';
import { ColumnDividerComponent } from 'src/app/shared/components/column/column-divider/column-divider.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

const components = [
	SlideThumbnailComponent,
	ColumnComponent,
	SlideLibraryDividerComponent,
	ColumnTitleComponent,
	SlideColumnDividerComponent,
	ColumnDividerComponent,
	ConfirmDialogComponent,
];

const entryComponents = [
	ColumnTitleComponent,
	ConfirmDialogComponent,
];

const directives = [];

const modules = [
	CommonModule,
	PrimeNgModule,
	FormsModule,
	ReactiveFormsModule,
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
