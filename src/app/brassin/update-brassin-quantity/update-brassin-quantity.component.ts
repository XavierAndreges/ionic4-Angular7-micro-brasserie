import { Component, OnInit } from '@angular/core';

import { RequestManager } from '../../providers/requestManager';
import { DataManager } from '../../providers/dataManager';
import { Brassin } from './../../models/types';
import { Input } from '@angular/core';

@Component({
  selector: 'update-brassin-quantity',
  templateUrl: './update-brassin-quantity.component.html',
  styleUrls: ['./update-brassin-quantity.component.scss']
})

export class UpdateBrassinQuantityComponent implements OnInit {

  public typeEmbouteillage: any = ["25", "33", "66"];
  @Input() brassin: Brassin = null;

  constructor(
    public requestManager: RequestManager,
    public dataManager: DataManager
  ) { }

  
  ngOnInit() {
    //console.log("XXX UpdateBrassinQuantityComponent -> ngOnInit : brassin", this.brassin);
  }


  public setBrassinQuantity(event: any, brassin: Brassin, index: number, typeEmbouteillage: string, value: number){

    console.log("XXX UpdateBrassinQuantityComponent -> setBrassinQuantity : brassin lot / index / typeEmbouteillage / value :", brassin.lot, index, typeEmbouteillage, value);

    event.preventDefault();

    document.getElementById("brassin_detail_spinner_" + index).style.display= "inline-block";

    this.requestManager.setBrassinQuantity(brassin, typeEmbouteillage, value).then(res => {

        let _index = this.dataManager.getIndexById(this.dataManager.brassinsData, this.brassin.id);
        this.dataManager.brassinsData[_index] = res;
        this.brassin = res;

        document.getElementById("brassin_detail_spinner_" + index).style.display= "none";
    
    });
  }

}
