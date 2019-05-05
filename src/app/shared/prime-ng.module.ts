import { NgModule } from '@angular/core';
import {
	ButtonModule,
	CardModule,
	ChipsModule,
	ConfirmDialogModule,
	DialogModule,
	DropdownModule,
	InputTextModule,
	MenubarModule,
	MultiSelectModule,
	SidebarModule,
} from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

const primeNGmodules = [
	SidebarModule,
	DropdownModule,
	MultiSelectModule,
	ButtonModule,
	DialogModule,
	InputTextModule,
	ChipsModule,
	ConfirmDialogModule,
	MenubarModule,
	ToastModule,
	CardModule,
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
