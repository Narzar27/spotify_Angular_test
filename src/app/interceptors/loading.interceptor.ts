import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

// loading.interceptor.ts
export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  loader.show();
  return next(req).pipe(
    finalize(() => {
      loader.hide();
    })
  );
};
