import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AutofocusDirective } from 'src/app/shared/directives/autofocus.directive';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PresentationTitleDialogComponent } from 'src/app/shared/components/presentation-title-dialog/presentation-title-dialog.component';
import { SlideActionComponent } from 'src/app/shared/components/slide-action/slide-action.component';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';

const components = [
	ConfirmDialogComponent,
	PresentationTitleDialogComponent,
	SlideActionComponent,
];

const entryComponents = [
	ConfirmDialogComponent,
	PresentationTitleDialogComponent,
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

const providers = [
	ComponentFactoryService,
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
	providers: [
		...providers,
	],
})
export class SharedModule {
}
