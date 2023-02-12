import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'adornments',
    loadComponent: () => import('./adornments/adornments.page'),
  },
  {
    path: 'blood-of-luclin',
    loadComponent: () => import('./blood-of-luclin/blood-of-luclin.page'),
  },
  {
    path: 'reign-of-shadows',
    loadComponent: () => import('./reign-of-shadows/reign-of-shadows.page'),
  },
  {
    path: 'planes-of-prophecy',
    loadComponent: () => import('./planes-of-prophecy/planes-of-prophecy.page'),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page'),
  },
  {
    path: 'soluseks-eye',
    loadComponent: () => import('./soluseks-eye/soluseks-eye.page'),
  },
  {
    path: 'ros-flawless',
    loadComponent: () => import('./ros-flawless/ros-flawless.page'),
  },
  {
    path: 'vov-flawless',
    loadComponent: () => import('./vov-flawless/vov-flawless.page'),
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly storage: Storage,
    public environmentInjector: EnvironmentInjector
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
