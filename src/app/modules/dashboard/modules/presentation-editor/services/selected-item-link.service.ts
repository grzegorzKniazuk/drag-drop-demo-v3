import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectedItemLinkService {

	public readonly selectedSlideId$: BehaviorSubject<number> = new BehaviorSubject(null);
	public readonly selectedPresentationId$: BehaviorSubject<number> = new BehaviorSubject(null);
}
