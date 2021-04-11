import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesOfProphecyPage } from './planes-of-prophecy.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesOfProphecyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesOfProphecyPageRoutingModule {}
