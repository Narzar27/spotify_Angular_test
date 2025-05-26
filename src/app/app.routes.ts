import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BrowseArtistsComponent } from './pages/browse-artists/browse-artists.component';
import { ArtistSearchComponent } from './pages/artist-search/artist-search.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'search', component: ArtistSearchComponent },
  { path: 'browse', component: BrowseArtistsComponent },
  { path: 'register', component: RegisterFormComponent },
];
