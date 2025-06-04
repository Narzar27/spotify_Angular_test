import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from '../google-auth.config';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'spotify-client';
  // loader = inject(LoaderService);
  // loading = true;

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        console.log('✅ Google login complete');
      }
    });
  }
}
