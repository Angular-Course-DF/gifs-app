import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}
@Component({
  selector: 'gifs-side-menu-option',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-option.component.html',
})
export class SideMenuOptionComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Gifs populares',
    },
    {
      icon: 'fa-solid fa-search',
      label: 'Buscador',
      route: '/dashboard/search',
      subLabel: 'Buscar Gifs',
    },
  ];
}
