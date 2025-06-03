import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('spotify_access_token');
    console.log('AuthGuard running, token =', token);
    if (!token) {
      this.router.navigate(['/']); // Redirect to home if token exists
      return false; // Prevent access to the route
    }

    return true; // Allow access to the route
  }
}

// This guard is used to prevent access to routes that require authentication.
//CanActivate is an interface that Angular provides to guard routes.
//blocks/allows access to a route based on a condition.
//The canActivate method is called when the route is about to be activated.

//The canActivateChild method is called when the route is about to be activated for a child route.
//can be used when you do not want to protect the entire route, but only a child route.
//or you want aditional more specific guard for a child route.

//The canLoad method is called when the route is about to be loaded.
//prevents lazy loaded modules from being loaded if the user is not authenticated.
//lazy loading is a technique that allows you to load modules on demand.

//The canDeactivate method is called when the route is about to be deactivated.
//asks for confirmation before deactivating a route.
//ng generate guard guards/unsaved-changes --implements=CanDeactivate

//canMatch method is called when the route is about to be matched.
//prevents a route from being matched if the user is not authenticated.
//It is new and replaces canLoad with more flexibility.
