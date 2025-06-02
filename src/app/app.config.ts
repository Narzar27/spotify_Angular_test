import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
    }),
  ],
};
