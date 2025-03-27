import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gifs-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {}
