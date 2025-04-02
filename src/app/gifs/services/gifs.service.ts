import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gif';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyBaseUrl}/gifs/trending`, {
        params: { api_key: environment.giphyAPiKey },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        console.log('Trending Gifs:', gifs);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
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
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
        //TODO: Historial
      );
    // .subscribe((response) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);

    //   console.log('Search Gifs:', gifs);
    // return gifs
    // });
  }

  getHistoryGisfs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
