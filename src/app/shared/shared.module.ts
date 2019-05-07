import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AutofocusDirective } from 'src/app/shared/directives/autofocus.directive';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PresentationTitleComponent } from 'src/app/shared/components/presentation-title/presentation-title.component';
import { SlideLinkActionComponent } from 'src/app/shared/components/slide-link-action/slide-link-action.component';

const components = [
	ConfirmDialogComponent,
	PresentationTitleComponent,
	SlideLinkActionComponent,
];

const entryComponents = [
	ConfirmDialogComponent,
	PresentationTitleComponent,
];

const directives = [
	AutofocusDirective,
];

const modules = [
	CommonModule,
	PrimeNgModule,
	MaterialModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule,
	HttpClientModule,
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
