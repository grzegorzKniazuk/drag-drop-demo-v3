import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class ToastService {

	constructor(private messageService: MessageService) {
	}

	public success(message: string): void {
		this.messageService.add({ severity: 'success', summary: 'Sukces!', detail: message });
	}

	public warning(message: string): void {
		this.messageService.add({ severity: 'warn', summary: 'Uwaga!', detail: message });
	}
}
