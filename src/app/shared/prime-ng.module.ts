import { NgModule } from '@angular/core';
import { ButtonModule, DropdownModule, MultiSelectModule, SidebarModule } from 'primeng/primeng';

@NgModule({
	imports: [
		SidebarModule,
		DropdownModule,
		MultiSelectModule,
		ButtonModule,
	],
	exports: [
		SidebarModule,
		DropdownModule,
		MultiSelectModule,
		ButtonModule,
	],
})
export class PrimeNgModule {
}
