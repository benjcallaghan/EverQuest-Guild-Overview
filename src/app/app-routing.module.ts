import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'blood-of-luclin',
    loadChildren: () =>
      import('./blood-of-luclin/blood-of-luclin.module').then(
        (m) => m.BloodOfLuclinPageModule
      ),
  },
  {
    path: 'reign-of-shadows',
    loadChildren: () =>
      import('./reign-of-shadows/reign-of-shadows.module').then(
        (m) => m.ReignOfShadowsPageModule
      ),
  },
  {
    path: 'planes-of-prophecy',
    loadChildren: () =>
      import('./planes-of-prophecy/planes-of-prophecy.module').then(
        (m) => m.PlanesOfProphecyPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'soluseks-eye',
    loadChildren: () => import('./soluseks-eye/soluseks-eye.module').then( m => m.SoluseksEyePageModule)
  },
  {
    path: 'ros-flawless',
    loadChildren: () => import('./ros-flawless/ros-flawless.module').then( m => m.RosFlawlessPageModule)
  },
  {
    path: 'vov-flawless',
    loadChildren: () => import('./vov-flawless/vov-flawless.module').then( m => m.VovFlawlessPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
