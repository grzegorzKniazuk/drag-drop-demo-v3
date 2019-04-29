import { NgModule } from '@angular/core';
import {
	ButtonModule,
	ChipsModule,
	ConfirmDialogModule,
	DialogModule,
	DropdownModule,
	InputTextModule,
	LightboxModule,
	MultiSelectModule,
	SidebarModule,
} from 'primeng/primeng';

const primeNGmodules = [
	SidebarModule,
	DropdownModule,
	MultiSelectModule,
	ButtonModule,
	DialogModule,
	InputTextModule,
	ChipsModule,
	ConfirmDialogModule,
	LightboxModule,
];

@NgModule({
	imports: [
		...primeNGmodules,
	],
	exports: [
		...primeNGmodules,
	],
})
export class PrimeNgModule {
}
