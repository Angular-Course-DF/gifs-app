import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history.page',
  imports: [],
  templateUrl: './gif-history-page.component.html',
})
export default class GifHistoryPageComponent {
  // route = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log('params', params['query']);
  // });
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );
}
