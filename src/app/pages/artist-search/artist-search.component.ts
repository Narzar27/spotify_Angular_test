import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; //Rxjs operators for handling value changes
import { HttpClient } from '@angular/common/http'; //used to make HTTP requests to the Spotify API
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-search',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css'],
})
export class ArtistSearchComponent {
  private fb = inject(FormBuilder); //used to build reactive forms
  private http = inject(HttpClient); //used to make HTTP requests to the Spotify API

  searchForm = this.fb.group({
    artist: [''], //This creates a reactive form group with a single control: artist
  });

  artists: any[] = []; //This will hold the search results
  //used to store the search results from the Spotify API

  ngOnInit(): void {
    this.searchForm
      .get('artist')
      ?.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => this.searchArtists(term ?? ''))
      )
      .subscribe((result: any) => {
        this.artists = result.artists?.items || [];
      });
  }
  //.valueChanges watches the input as the user types and emits the current value of the input field.
  //debounceTime(400) waits for 400 milliseconds after the last keystroke before emitting the value
  //distinctUntilChanged() ensures that the search is only performed if the value has changed since the last emission
  //switchMap() cancels the previous search request if a new value is emitted, and switches to the new search request
  //subscribe() is used to handle the result of the search request

  private searchArtists(query: string) {
    const token = localStorage.getItem('spotify_access_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get(`https://api.spotify.com/v1/search`, {
      headers,
      params: {
        q: query,
        type: 'artist',
        limit: 10,
      },
    });
  }
}
