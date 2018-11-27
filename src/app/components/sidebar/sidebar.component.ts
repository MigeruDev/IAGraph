import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/table-list', title: 'Tabla Comparativa',  icon:'content_paste', class: '' },
    { path: '/user-profile', title: 'Grafo',  icon:'person', class: '' },    
    { path: '/typography', title: 'Búsqueda Ciega',  icon:'visibility_off', class: '' },
    { path: '/notifications', title: 'Búsqueda Heurística',  icon:'timeline', class: '' },
    { path: '/upgrade', title: '???',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
