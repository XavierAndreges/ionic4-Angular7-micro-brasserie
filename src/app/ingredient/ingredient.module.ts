import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IngredientListComponent } from './list/ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { LevureComponent } from './list/levure/levure.component';
import { HoublonComponent } from './list/houblon/houblon.component';
import { MaltComponent } from './list/malt/malt.component';
import { FloconComponent } from './list/flocon/flocon.component';
import { EpiceComponent } from './list/epice/epice.component';

@NgModule({

  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':category',
        component: IngredientListComponent
      },
      {
        path: ':category/:id',
        component: IngredientDetailComponent
      }
    ])    
  ],

  declarations: [IngredientListComponent, IngredientDetailComponent, 
    LevureComponent, HoublonComponent, MaltComponent, FloconComponent, EpiceComponent]
})

export class IngredientModule { }
