import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class InternalSlideLinkService {

	public selectedSlideId$: BehaviorSubject<number> = new BehaviorSubject(null);
}
