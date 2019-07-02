import { LevureCheckedService } from './../infoService';
import { DataManager } from './../../providers/dataManager';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'levuresCheckBox',
  templateUrl: 'levuresCheckBox.html'
})

export class LevuresCheckBox implements OnInit  {


    constructor(
      public levureCheckedService: LevureCheckedService,
      public dataManager: DataManager) {
    }


    public ngOnInit() {
      console.log("XXXXX LevuresCheckBox => OnInit() : levuresCheckedList", this.dataManager.levuresCheckedList);
    }

    public ionViewDidEnter() {
      console.log("LevuresCheckBox -> ionViewDidEnter");
    }


    public ionChange(levure: any){
      //console.log("XXXXX HoublonsCheckBox => ionChange() : houblon", houblon);

      if (this.checkIfLevuresIsChecked(levure.id)) {
        this.dataManager.levuresCheckedList.splice(this.dataManager.levuresCheckedList.indexOf(levure.id), 1);
      } else {
        this.dataManager.levuresCheckedList.push(levure.id);
      }
    
      this.levureCheckedService.dispatchInfo(this.dataManager.levuresCheckedList);

      console.log("XXXXX HoublonsCheckBox => ionChange() : levuresCheckedList", this.dataManager.levuresCheckedList);
    }


    public checkIfLevuresIsChecked(id): boolean {
      let idIsPresent = false;
      this.dataManager.levuresCheckedList.forEach((item: number) => {
        if (id === item) {
          idIsPresent = true;
        }
      });
      return idIsPresent;
    }
}