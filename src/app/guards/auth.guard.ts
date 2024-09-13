import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Get an instance of AuthService
  const router = inject(Router); // Get an instance of Router

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // User is authenticated, allow access
  } else {
    // User is not authenticated, redirect to login page
    router.navigate(['/login']); // Adjust the route to your login page
    return false; // Prevent access to the requested route
  }
};
