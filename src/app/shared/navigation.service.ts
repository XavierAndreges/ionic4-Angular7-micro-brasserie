import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { DataManager } from './../providers/dataManager';
import { UtilsService } from './../shared/utilsService';

@Injectable()

export class NavigationService  {

  constructor(
    private router: Router,
    private dataManager: DataManager,
    private utilsService: UtilsService
  ){ 

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log("DataManager -> ngOnIconstructornit() : route subscribe NavigationEnd", event);

        if (this.dataManager.lastUrl !== "" && this.utilsService.checkIfBaseUrlDifferent(this.dataManager.lastUrl, event.url)) {
          this.dataManager.idItemListSelected = "";
        }    
        this.dataManager.lastUrl = event.url;
      }
    });

  }


  public getPrevOrNextIndex(type: string, index: number, dataList: any[]): number {
    if (type === "next") {
      if (index + 1 < dataList.length) {
        index++;
      } else {
        index = 0;
      }
    } else {
      if (index - 1 >= 0) {
        index--;
      } else {
        index = dataList.length - 1;
      }
    }
    return index;
  }

}
