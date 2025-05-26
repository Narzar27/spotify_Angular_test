// This file is part of the Spotify PKCE Authentication Service
//An angular service is reusable code that holds logic that can be shared across components.
//Like API CALLS, AUTHENTICATION, STATE MANAGEMENT, ETC.
// This service handles the PKCE flow for Spotify authentication, including generating code verifiers and challenges, redirecting to Spotify's authorization endpoint, and exchanging the authorization code for an access token.

//So instead of writing authentication logic in each component,
// we can write it once in this service and use it in any component that needs it.
//so this file handles:generating PKCE vaalues
// redirecting to Spotify's authorization endpoint
// exchanging the authorization code for an access token
//storing the access token in local storage

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
}) //This makes the service available throughout the application
export class SpotifyAuthService {
  clientId = '2798f5230d0e47ce8f247fede1e1bfb7';
  redirectUri = 'http://127.0.0.1:4200';
  scopes = ['user-read-private', 'user-read-email'];

  // This method generates a code verifier for PKCE.
  // A code verifier is a random string used to secure the authorization code flow.
  generateCodeVerifier(length = 128): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((x) => chars.charAt(x % chars.length))
      .join('');
  }

  // This method generates a code challenge from the code verifier.
  // The code challenge is derived from the code verifier using SHA-256 hashing.
  async generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // This method initiates the PKCE flow by redirecting the user to Spotify's authorization endpoint.
  // It constructs the authorization URL with the necessary parameters, including the client ID, redirect URI, scopes, and code challenge.
  async loginWithPKCE(): Promise<void> {
    const verifier = this.generateCodeVerifier();
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem('spotify_pkce_verifier', verifier);

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: this.scopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // This method exchanges the authorization code for an access token.
  // It retrieves the code verifier from local storage, constructs the request body with the necessary parameters,
  // and sends a POST request to Spotify's token endpoint.
  // If successful, it stores the access token in local storage for future use.

  async exchangeCodeForToken(code: string): Promise<string> {
    const verifier = localStorage.getItem('spotify_pkce_verifier');
    if (!verifier) throw new Error('Missing PKCE verifier');

    const body = new URLSearchParams({
      client_id: this.clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      code_verifier: verifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Token exchange failed');

    localStorage.setItem('spotify_access_token', result.access_token);
    return result.access_token;
  }
}
