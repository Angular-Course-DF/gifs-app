import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifsService = inject(GifService);
  gifs = signal<Gif[]>([]);
  onSearch(query: string) {
    console.log('Search query:', query);
    this.gifsService.searchGifs(query).subscribe((resp) => {
      // const gifs = this.gifsService.mapGiphyItemsToGifArray(response.data);
      // console.log('Search Gifs:', response);
      this.gifs.set(resp);
    });
  }
}
