import { HoublonCheckedService } from './../infoService';
import { DataManager } from './../../providers/dataManager';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'houblonsCheckBox',
  templateUrl: 'houblonsCheckBox.html'
})

export class HoublonsCheckBox implements OnInit  {


    constructor(
      public houblonCheckedService: HoublonCheckedService,
      public dataManager: DataManager) {
    }


    public ngOnInit() {
      console.log("XXXXX HoublonsCheckBox => OnInit() : houblonsCheckedList", this.dataManager.houblonsCheckedList);
    }

    public ionViewDidEnter() {

      console.log("HoublonsCheckBox -> ionViewDidEnter");
  
      document.getElementById("houblonAromatiqueList").style.display= "none";    
    }


    public ionChange(houblon: any, type: string){
      //console.log("XXXXX HoublonsCheckBox => ionChange() : houblon", houblon);

      if (this.checkIfHoublonsIsChecked(houblon.id, type)) {
        this.dataManager.houblonsCheckedList[type].splice(this.dataManager.houblonsCheckedList[type].indexOf(houblon.id), 1);
      } else {
        this.dataManager.houblonsCheckedList[type].push(houblon.id);
      }
    
      this.houblonCheckedService.dispatchInfo(this.dataManager.houblonsCheckedList);

      console.log("XXXXX HoublonsCheckBox => ionChange() : houblonsCheckedList", this.dataManager.houblonsCheckedList);
    }


    public checkIfHoublonsIsChecked(id, type: string): boolean {

      //console.log("XXXXX HoublonsCheckBox => checkIfHoublonsIsChecked() : houblonsCheckedList", this.dataManager.houblonsCheckedList);

      let idIsPresent = false;
      this.dataManager.houblonsCheckedList[type].forEach((item: number) => {
        if (id === item) {
          idIsPresent = true;
        }
      });
      return idIsPresent;
    }


    public displayHoublonList(event, type: string) {

      if (type == "amerisant") {
        document.getElementById("houblonAmerisantList").style.display= "block";   
        document.getElementById("houblonAromatiqueList").style.display= "none";   
      } else {
        document.getElementById("houblonAmerisantList").style.display= "none";   
        document.getElementById("houblonAromatiqueList").style.display= "block";   
      }
    }


    public getPastilles(type: string) {
      return this.dataManager.houblonsCheckedList[type].length;
    }

}