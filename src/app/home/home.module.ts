import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicStorageModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        SharedModule
    ],
    declarations: [HomePage]
})
export class HomePageModule { }
