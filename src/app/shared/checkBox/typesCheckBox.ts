import { Component } from '@angular/core';
import { InfoService } from '../../shared/infoService';
import { DataManager } from '../../providers/dataManager';

@Component({
  selector: 'typesCheckBox',
  templateUrl: 'typesCheckBox.html'
})

export class TypesCheckBox {


    constructor(
      public infoService: InfoService,
      public dataManager: DataManager) {
      
    }


    public ionFocus(type: string){
      console.log("XXXXX TypesCheckBox => ionFocus : type", type);
      this.resetListCheckBoxToFalse(type);
    }

    public ionChange(type: string){
      console.log("XXXXX TypesCheckBox => ionChange : type", type);
      this.infoService.dispatchInfo(type);
    }


    public resetListCheckBoxToFalse(type: string){
      this.dataManager.typeList.forEach((element: string) => {
        if(element !== type) {
          this.dataManager.typeListCheckBox[element] = false;
        }   
      });
    }

}