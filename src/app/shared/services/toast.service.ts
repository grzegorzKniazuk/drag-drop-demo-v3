import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class ToastService {

	constructor(private messageService: MessageService) {
	}

	public success(message: string): void {
		this.messageService.add({ severity: 'success', summary: 'Sukces', detail: message });
	}

	public information(message: string): void {
		this.messageService.add({ severity: 'info', summary: 'Wskazówka', detail: message, life: 3500 });
	}

	public warning(message: string): void {
		this.messageService.add({ severity: 'warn', summary: 'Uwaga', detail: message });
	}
}
