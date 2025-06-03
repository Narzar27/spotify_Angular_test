// An HTTP interceptor in Angular is a service that intercepts all outgoing HTTP requests and incoming responses. You can use them to:

// Automatically attach headers (like auth tokens)

// Log requests/responses

// Handle errors globally

// Modify responses

//authinterceptor is a function that takes a request and a next function
//it checks if the user is logged in and adds the token to the request
//via an Authorization header
//passes the request to the next handler in the chain(backend)

//benefits:
//1. Automatically attaches the token to all requests
//2. security: prevents unauthenticated users from accessing protected routes
//3. cleaner services

//can also be used to log requests/responses
//handle errors globally
//auto redirect to login if 401 unauthorized

import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('spotify_access_token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};

//this checks if the user is logged in and adds the token to the request
//via an Authorization header
//passes the request to the next handler in the chain(backend)

//if no token, passes the request as is to the next handler

//Other interceptors:
//token refresh interceptor:automatically refreshes the token when it expires
//used to keep the user logged in without manual re-authentication

//loading spinner interceptor:shows a loading spinner during requests
//helps prevent duplicate requests while waiting for the response

//error handling interceptor:catches errors and displays a user-friendly error message

//custom header interceptor:adds custom headers to all requests
//adds custom headers,example when passing metadata required for the backend or third party APIs
