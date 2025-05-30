import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles: string[] = route.data['roles'];
    const hasAccess = requiredRoles.some((role) => this.auth.hasRole(role));

    if (!hasAccess) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true
  }

}
