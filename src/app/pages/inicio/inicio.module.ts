import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { StartAppPage } from '../start-app/start-app.page';
import { StartAppPageModule } from '../start-app/start-app.module';

@NgModule({
  entryComponents: [
    StartAppPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    StartAppPageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
