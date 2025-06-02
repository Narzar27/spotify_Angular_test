import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      this.router.navigate(['/']); // Redirect to home if token exists
      return false; // Prevent access to the route
    }

    return true; // Allow access to the route
  }
}
