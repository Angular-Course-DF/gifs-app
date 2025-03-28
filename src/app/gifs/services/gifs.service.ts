import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trenfingGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrendingGifs();
  }
  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyBaseUrl}/gifs/trending`, {
        params: { api_key: environment.giphyAPiKey },
      })
      .subscribe((response) => {
        console.log('Trending Gifs:', response.data);
      });
  }
}
