import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/modules/presentation-creator/presentation-creator.component';

@Injectable({
	providedIn: 'root',
})
export class LeavePresentationEditorGuard implements CanDeactivate<PresentationCreatorComponent> {

	public canDeactivate(component: PresentationCreatorComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return component.confirmEditorLeave();
	}
}
