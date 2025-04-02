import { GifService } from 'src/app/gifs/services/gifs.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history.page',
  imports: [GifListComponent],
  templateUrl: './gif-history-page.component.html',
})
export default class GifHistoryPageComponent {
  gifService = inject(GifService);
  // route = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log('params', params['query']);
  // });
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );
  gifsByKey = computed(() => {
    const gifs = this.gifService.getHistoryGisfs(this.query());
    return gifs ? gifs : [];
  });
}
