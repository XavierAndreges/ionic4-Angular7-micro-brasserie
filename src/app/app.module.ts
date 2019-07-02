//import { BrassinList } from './brassinList/brassinList';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestManager } from './providers/requestManager';
import { DataManager } from './providers/dataManager';
import { InfoService, HoublonCheckedService, LevureCheckedService, ItemTappedIngredientService } from './shared/infoService';
import { UtilsService } from './shared/utilsService';
import { AlertService } from './shared/alert.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NavigationService } from './shared/navigation.service';

//obligé de le déclarer ici à cause du ngModel utilisé dans sa vue
import { TypesCheckBox } from './shared/checkBox/typesCheckBox';
import { MyHttpInterceptor } from './providers/MyHttpInterceptor';


@NgModule({
  declarations: [AppComponent, TypesCheckBox],
  entryComponents: [TypesCheckBox],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    RequestManager,
    DataManager,
    InfoService, UtilsService, NavigationService, AlertService,
    HoublonCheckedService, LevureCheckedService,
    ItemTappedIngredientService, 
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
