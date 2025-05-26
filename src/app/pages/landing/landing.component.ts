//This file shows the login button and reacrts to login events

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

//Component decorator defines the metadata for the component
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(
    private auth: SpotifyAuthService,
    private route: ActivatedRoute, //Let's us check the current URL
    private router: Router //Allows us to navigate to different routes in the app
  ) {
    this.route.queryParams.subscribe(async (params) => {
      if (params['code']) {
        try {
          await this.auth.exchangeCodeForToken(params['code']);
          this.router.navigate(['/search']);
        } catch (err) {
          console.error('Auth error', err);
        }
      }
    });
  }

  login() {
    this.auth.loginWithPKCE();
  }
  //This method is called when the user clicks the login button
  //It calls the loginWithPKCE method from the SpotifyAuthService to initiate the login process
  //if the user is already logged in, it will redirect them to the search page
}
