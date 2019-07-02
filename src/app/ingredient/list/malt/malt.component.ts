import { Component, OnInit, Input } from '@angular/core';
import { DataManager } from '../../../providers/dataManager';
import { Brassin, RouteParams } from '../../../models/types';
import { ItemTappedIngredientService } from '../../../shared/infoService';
import { UtilsService } from './../../../shared/utilsService';


@Component({
  selector: 'app-malt',
  templateUrl: './malt.component.html',
  styleUrls: ['./malt.component.scss']
})
export class MaltComponent implements OnInit {

  @Input() category: string;
  @Input() ingredients: any[];

  constructor(
    private utilsService: UtilsService,
    private itemTappedIngredientService: ItemTappedIngredientService,
    public dataManager: DataManager
  ) { }


  ngOnInit() {
    console.log("XXXX  MaltComponent => ngOnInit() : ingredients", this.ingredients);
  }


  public itemTapped(event: any, nom: string, id:number, index:number) {
    let params : RouteParams = {"id": id, "index": index, "nom": nom};
    this.itemTappedIngredientService.dispatchInfo(params);
  }

}
