import { Component, OnInit, Input } from '@angular/core';
import { DataManager } from '../../../providers/dataManager';
import { Brassin, RouteParams } from '../../../models/types';
import { ItemTappedIngredientService } from '../../../shared/infoService';

@Component({
  selector: 'app-levure',
  templateUrl: './levure.component.html',
  styleUrls: ['./levure.component.scss']
})

export class LevureComponent implements OnInit {

  @Input() category: string;
  @Input() ingredients: any[];

  constructor(
    public dataManager: DataManager,
    public itemTappedIngredientService: ItemTappedIngredientService
  ) { }

  ngOnInit() {
    console.log("XXXX  LevureComponent => ngOnInit() : ingredients / Input()", this.ingredients);
  }


  public getQuantity(item: any): string{

    let unit: string = " pq";

    if (item.quantite && item.quantite > 1) {
      unit += "s";
    }
    return (item.quantite ? item.quantite : "0") + unit;
  }


  public getAverageDensity(brassins: Brassin[]) {
 
    //console.log("XXXX LevuresListPage => getAverageDensity : brassins", brassins);

    var total: number = 0;

    var nbBrassin: number  = 0;

      brassins.forEach(brassin => {
        if (brassin.volume_densite && brassin.volume_densite.d_embouteillage) {
          total += brassin.volume_densite.d_embouteillage;
          nbBrassin++;
        }
      });

      /*
      console.log("XXXX LevuresListPage => getAverageDensity : total", total);
      console.log("XXXX LevuresListPage => getAverageDensity : nbBrassin", nbBrassin);
*/
      if (nbBrassin > 0 ) {
        return Math.floor(total / nbBrassin);
      } else {
        return "";
      }
  }


  public itemTapped(event: any, nom: string, id:number, index:number) {

    let params : RouteParams = {"id": id, "index": index, "nom": nom};
    this.itemTappedIngredientService.dispatchInfo(params);
  }

}
