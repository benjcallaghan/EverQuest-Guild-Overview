import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RosFlawlessPage } from './ros-flawless.page';

const routes: Routes = [
  {
    path: '',
    component: RosFlawlessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RosFlawlessPageRoutingModule {}
