// google-auth.config.ts
import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId:
    '219682393223-mgi1edo36n59m3pc5ubisrdt6bnoj4da.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
};
