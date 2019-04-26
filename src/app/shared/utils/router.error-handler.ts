import { ErrorHandler } from '@angular/core';

export class RouterErrorHandler implements ErrorHandler {
	public handleError(error: any): never {
		throw Error(error);
	}
}
