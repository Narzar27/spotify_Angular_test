import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
// import { providePrimeNG } from 'primeng/config';
import { provideOAuthClient, OAuthModuleConfig } from 'angular-oauth2-oidc';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideOAuthClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor, LoadingInterceptor])),
    // providePrimeNG({
    //   theme: {
    //     preset: Aura,
    //     options: {
    //       prefix: 'p',
    //     },
    //   },
    // }),
  ],
};
