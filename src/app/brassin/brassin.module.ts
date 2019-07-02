import { BrassinDetail } from './brassin-detail/brassinDetail';
import { BrassinList } from './brassin-list/brassin-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UpdateBrassinQuantityComponent } from './update-brassin-quantity/update-brassin-quantity.component';
import { HoublonsCheckBox } from '../shared/checkBox/houblonsCheckBox';
import { LevuresCheckBox } from '../shared/checkBox/levuresCheckBox';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':category',
        component: BrassinList
      },
      {
        path: ':category/:id',
        component: BrassinDetail
      }
    ])
  ],
  declarations: [BrassinList, BrassinDetail, UpdateBrassinQuantityComponent, HoublonsCheckBox, LevuresCheckBox],
  entryComponents: [HoublonsCheckBox, LevuresCheckBox]
})

export class BrassinModule { }
