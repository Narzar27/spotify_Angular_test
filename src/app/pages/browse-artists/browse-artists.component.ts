import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-browse-artists',
  imports: [CommonModule, TruncatePipe],
  standalone: true,
  templateUrl: './browse-artists.component.html',
  styleUrl: './browse-artists.component.css',
})
export class BrowseArtistsComponent implements OnInit {
  // Inject ActivatedRoute to access route parameters
  private route = inject(ActivatedRoute);
  // Inject HttpClient to make HTTP requests
  private http = inject(HttpClient);

  // Store artist ID and name from query params
  artistId = '';
  artistName = '';
  // Store albums fetched from Spotify API
  albums: any[] = [];

  ngOnInit(): void {
    // Subscribe to query parameters to get artist ID and name
    this.route.queryParams.subscribe((params) => {
      this.artistId = params['id'];
      this.artistName = params['name'];
      // If artist ID is present, load albums
      if (this.artistId) this.loadAlbums();
    });
  }

  // Fetch albums for the current artist from Spotify API
  loadAlbums() {
    // Get the Spotify access token from local storage
    const token = localStorage.getItem('spotify_access_token');
    // Set up authorization headers
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .get(`https://api.spotify.com/v1/artists/${this.artistId}/albums`, {
        headers,
        params: {
          limit: 20, // Limit the number of albums returned
          include_groups: 'album,single,appears_on', // Include different album types
        },
      })
      .subscribe((res: any) => {
        // Store the fetched albums in the albums array
        this.albums = res.items;
      });
  }
}
