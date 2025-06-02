import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BrowseArtistsComponent } from './pages/browse-artists/browse-artists.component';
import { ArtistSearchComponent } from './pages/artist-search/artist-search.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { ChatHubComponent } from './pages/chat/chathub.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'search',
    component: ArtistSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'browse',
    component: BrowseArtistsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatHubComponent,
    canActivate: [AuthGuard],
  },
];
