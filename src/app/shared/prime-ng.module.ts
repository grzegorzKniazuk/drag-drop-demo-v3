import { NgModule } from '@angular/core';
import { ButtonModule, ChipsModule, DialogModule, DropdownModule, InputTextModule, MultiSelectModule, SidebarModule } from 'primeng/primeng';

const primeNGmodules = [
	SidebarModule,
	DropdownModule,
	MultiSelectModule,
	ButtonModule,
	DialogModule,
	InputTextModule,
	ChipsModule,
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
