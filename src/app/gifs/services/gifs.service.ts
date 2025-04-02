import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trenfingGifs = signal<Gif[]>([]);
  trenfingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }
  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyBaseUrl}/gifs/trending`, {
        params: { api_key: environment.giphyAPiKey },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        console.log('Trending Gifs:', gifs);
        this.trenfingGifs.set(gifs);
        this.trenfingGifsLoading.set(false);
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyBaseUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyAPiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items))

        //TODO: Historial
      );
    // .subscribe((response) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);

    //   console.log('Search Gifs:', gifs);
    // return gifs
    // });
  }
}
