import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'brassins/stockage',
    pathMatch: 'full'
  },
  {
    path: 'brassins',
    loadChildren: './brassin/brassin.module#BrassinModule',
    canActivate: [AuthGuardService] 
  },
  {
    path: 'ingredient',
    loadChildren: './ingredient/ingredient.module#IngredientModule',
    canActivate: [AuthGuardService] 
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
