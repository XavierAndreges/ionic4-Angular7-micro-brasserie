import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable()

export class UtilsService {

  constructor(
    public statusBar: StatusBar,
  ) { }

  
  public setStatusBar() {
    this.statusBar.overlaysWebView(true);
    console.log("UtilsService => setStatusBar() : statusBar.isVisible", this.statusBar.isVisible);
  }

  public getTypeColorRef(type: string) {
    let color: string;
    switch(type) {
      case "blonde" : color = "darkKhaki "; break;
      case "triple" : color = "green"; break;
      case "blanche" : color = "CornflowerBlue"; break;
      case "seigle" : color = "darkGray ";  break;
      case "rouge" : color = "red"; break;
      case "ambrée" : color = "orange"; break;
      case "brune" : color = "navy"; break;
      default : color = "primary";
    }
    return color;
  }


  public getQuantity(category: string, item: any): string{
    //console.log("XXXX UtilsService -> getQuantity : category / item", category, item);
    let unit: string = "";
    if (category === "malt" || category === "flocon") {
      unit = "kg";
    } else {
      unit = "gr";
    }
    if (item.quantite > 1) {
      unit += "s";
    }
    return (item.quantite == 0 ? "00000" : item.quantite) + unit;
  }

  
  public getConcatenateArray(saveurs: any[] = [], _separator: string) : string {
    let string = "";
    saveurs.forEach((saveur: any, i: number) => {
        string += saveur.nom;
        if (i < saveurs.length - 1) {
          string += _separator + " ";
      }
    });
    return string;
  }


  public firstLetterCapital(input: string): string {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }


  public checkIfBaseUrlDifferent(previousUrl: string, currentUrl: string):boolean {
    let isDifferent: boolean = true;
    let previousArray = previousUrl.split("/");
    let currentArray = currentUrl.split("/");
    //console.log("UtilsService -> checkIfBaseUrlDifferent() : previousArray", previousArray);
    //console.log("UtilsService -> checkIfBaseUrlDifferent() : currentArray", currentArray);
    if (previousArray.length > 0 && currentArray.length > 0
      && (previousArray[1] === currentArray[1])) {
        isDifferent = false;
    } 
    return isDifferent
  }


  public deepClone(object): any {
    const cloneObj = (<any>object.constructor());
    const attributes = Object.keys(object);
    for (const attribute of attributes) {
        const property = object[attribute];

        if (typeof property === 'object') {
            cloneObj[attribute] = this.deepClone(property);
        } else {
            cloneObj[attribute] = property;
        }
    }
    return cloneObj;
}

}