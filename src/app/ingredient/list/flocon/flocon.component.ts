import { Component, OnInit, Input } from '@angular/core';
import { DataManager } from '../../../providers/dataManager';
import { Brassin, RouteParams } from '../../../models/types';
import { ItemTappedIngredientService } from '../../../shared/infoService';
import { UtilsService } from './../../../shared/utilsService';

@Component({
  selector: 'app-flocon',
  templateUrl: './flocon.component.html',
  styleUrls: ['./flocon.component.scss']
})

export class FloconComponent implements OnInit {

  @Input() category: string;
  @Input() ingredients: any[];

  constructor(
    private utilsService: UtilsService,
    private itemTappedIngredientService: ItemTappedIngredientService,
    public dataManager: DataManager
  ) { }

  ngOnInit() {
    console.log("XXXX  FloconComponent => ngOnInit() : ingredients", this.ingredients);
  }

  public itemTapped(event: any, nom: string, id:number, index:number) {
    let params : RouteParams = {"id": id, "index": index, "nom": nom};
    this.itemTappedIngredientService.dispatchInfo(params);
  }

}
