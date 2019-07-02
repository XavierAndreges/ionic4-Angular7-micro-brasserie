import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { RequestManager } from '../../providers/requestManager';
import { DataManager } from '../../providers/dataManager';

import { LoadingController, AlertController, PopoverController } from '@ionic/angular';

import { Brassin } from './../../models/types';
import { TypesCheckBox } from '../../shared/checkBox/typesCheckBox';
import { HoublonsCheckBox } from '../../shared/checkBox/houblonsCheckBox';
import { LevuresCheckBox } from './../../shared/checkBox/levuresCheckBox';
import { InfoService, HoublonCheckedService, LevureCheckedService } from '../../shared/infoService';
import { UtilsService } from '../../shared/utilsService';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertService } from './../../shared/alert.service';

@Component({
  selector: 'brasserie-brassins-list',
  templateUrl: 'brassin-list.component.html',
  styleUrls: ['brassin-list.component.scss'],
})

//const LABEL_BTN_TYPE = "Type";

export class BrassinList implements OnInit {

  public selectedBrassin: Brassin;
  public brassins:Brassin[] = [];

  public volumeTotal: number = 0;
  public isLoadingController: boolean = true;
  public title: string;
  public labelDetails: string;

  public stockageCategory: boolean = false;
  public listCategory: boolean = false;
  public nextCategory: boolean = false;
  public isDetailsVolumeDensiteDisplay: boolean = false;
  
  public typeSelected: string = "Type";
  public colorTypeSelected: string = "secondary";
  public colorLevureSelected: string = "primary";

  constructor(
    public http: HttpClient,
    private router: Router,
    public requestManager: RequestManager,
    public dataManager: DataManager,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public infoService: InfoService,
    public houblonCheckedService: HoublonCheckedService,
    public levureCheckedService: LevureCheckedService,
    private route: ActivatedRoute,
    public statusBar: StatusBar,
    public utilsService: UtilsService,
    public alertService: AlertService
  ) {
    
  }

    /*
    ionViewDidLoad
    ionViewWillEnter
    ionViewDidEnter
    ionViewWillLeave
    ionViewDidLeave
    ionViewWillUnload
    */


  ngOnInit() {
        this.utilsService.setStatusBar();
        this.requestManager.loadIngredientsList();
        this.subscribeTypeCheckBoxChanged();
        this.subscribeHoublonCheckBoxChanged();
        this.subscribeLevureCheckBoxChanged();
  }


  public ionViewDidEnter() {
    console.log("BrassinList -> ionViewDidEnter : brassinsData", this.dataManager.brassinsData);
    this.checkParamUrl();
    if (this.dataManager.brassinsData.length === 0){
      this.loadBrassinsList(null);  
    } else {
      this.doActions();
    }    
  }


  public ionViewWillLeave() {
    console.log("BrassinList -> ionViewWillLeave : typeSelected", this.typeSelected);
    if (this.typeSelected !== "Type") {
      this.dataManager.typeSelected = this.typeSelected;
    } else {
      this.dataManager.typeSelected = "Type";
    }

    this.dataManager
  }


  public checkParamUrl() {
    switch (this.route.snapshot.paramMap.get('category')) {
      case 'stockage' : this.stockageCategory = true;
      break;
      case 'list' : this.listCategory = true;
      break;
      case 'next' : this.nextCategory = true;
      break;
      default : this.stockageCategory = true;
      break;
    }
    console.log("BrassinList => checkParamUrl() : category", this.route.snapshot.paramMap.get('category'));
    //console.log("BrassinList => ionViewDidEnter : listCategory", this.listCategory);
  }
  

  public loadBrassinsList(event: any) {

    console.log("BrassinList => loadBrassinsList : event", event);

    if (!event)
      this.alertService.presentLoading();

    this.requestManager.getBrassinsFromServer().then(res => {

      this.dataManager.brassinsData = res.reverse();

      this.doActions();

      if (event) {
        event.target.complete();
      } else {
        this.loadingController.dismiss();
        this.isLoadingController = false;
      }    
    })
    .catch((Error: HttpErrorResponse) => {

      console.log("BrassinList -> loadBrassinsList : getBrassinsFromServer / ERROR", Error);
      this.alertService.presentAlert(Error, "getBrassinsFromServer");

      if (this.isLoadingController) {
        this.alertService.loadingController.dismiss();
        this.isLoadingController = false;
      }
      if (event) {
        event.target.complete();
      }
    });
  }


  public doActions() {
    this.setTitle();
    this.setTypeSelected();  
    this.reverseBrassins(null);  
    this.scrollTo();
    console.log("BrassinList -> doActions : brassins", this.brassins);
  }


  public setTypeSelected() {
    console.log("BrassinList => setTypeSelected() : typeSelected", this.typeSelected);
    console.log("BrassinList => setTypeSelected() : this.dataManager.typeSelected", this.dataManager.typeSelected);
    if (this.dataManager.typeSelected != "Type") {
      this.typeSelected =  this.dataManager.typeSelected;
      this.colorTypeSelected = "warning"; 
    }
  }


  public scrollTo() {
    console.log("BrassinList -> scrollTo : idItemListSelected", this.dataManager.idItemListSelected);
    let time = !this.dataManager.appLoadedFromRoot ? 1000 : 0;
    if (this.dataManager.idItemListSelected !== "") {
      setTimeout(() => {
        let element = document.getElementById(this.dataManager.idItemListSelected);
        element.scrollIntoView({behavior: "instant", block: "center", inline: "nearest"});
      }, time);
    }
  }


  public reverseBrassins($event){

    if ($event) {

      this.dataManager.brassinsData.reverse();
      this.dataManager.isListBrassinsReversed = !this.dataManager.isListBrassinsReversed; 
  
      if (this.dataManager.isListBrassinsReversed) {
        (document.querySelector("#reverseBtn") as HTMLElement).style.transform = "rotate(180deg)";
      } else {
        (document.querySelector("#reverseBtn") as HTMLElement).style.transform = "rotate(0deg)";
      }

    } else if (!this.nextCategory) {

      setTimeout(() => {
        if (this.dataManager.isListBrassinsReversed) {
          (document.querySelector("#reverseBtn") as HTMLElement).style.transform = "rotate(180deg)";
        }
        (document.querySelector("#reverseBtn") as HTMLElement).style.display = "block";
      }, 500);

    }

    this.sortByVendable(null);
    
    console.log("BrassinList => reverseBrassins / NEW : isListBrassinsReversed", this.dataManager.isListBrassinsReversed);
  }


  public sortByVendable($event) {

    if ($event) {
      this.dataManager.euroBtnSelected = !this.dataManager.euroBtnSelected;
    }

    let _brassins: Brassin[] = [];

    if (this.dataManager.euroBtnSelected) {
      
      this.dataManager.colorEuroBtn = "danger";

      _brassins = this.dataManager.sortBrassinsByVendable(this.dataManager.brassinsData);

      if (this.typeSelected !== "Type") {
        this.brassins = this.dataManager.sortBrassinsDataByType(_brassins, this.typeSelected);
      } else {
        this.brassins = _brassins;
      }

    } else {

      this.dataManager.colorEuroBtn = "primary";

      if (this.typeSelected !== "Type") {
        _brassins = this.dataManager.sortBrassinsDataByType(this.dataManager.brassinsData, this.typeSelected);
      } else {
        _brassins = this.dataManager.brassinsData;
      }

      if (this.dataManager.houblonsCheckedList['amerisant'].length > 0 || this.dataManager.houblonsCheckedList['aromatique'].length > 0) {
        _brassins = this.dataManager.sortBrassinsByHoublons(_brassins);
      }     
      
      if (this.dataManager.levuresCheckedList.length > 0) {
        _brassins = this.dataManager.sortBrassinsByLevures(_brassins);
      }

      if (this.nextCategory) {
        this.brassins = this.dataManager.sortBrassinsByNext(_brassins);
      } else {
        this.brassins = _brassins;
      }
    }
  }


  public subscribeTypeCheckBoxChanged() {

    //console.log("XXXX BrassinList -> subscribeTypeCheckBoxChanged");
    this.infoService.infoStream.subscribe(
      type => {
        console.log("BrassinList -> infoService.infoStream : type", type);
        console.log("BrassinList -> infoService.infoStream : typeSelected 1", this.typeSelected);

        if (this.typeSelected === "Type" || this.typeSelected !== type){

          this.typeSelected = type;
          this.colorTypeSelected = "warning";  

        } else {

          this.typeSelected = "Type";
          this.colorTypeSelected = "secondary"; 
        }

        this.sortByVendable(null);

        this.popoverController.dismiss();

        console.log("BrassinList -> infoService.infoStream : typeSelected 2", this.typeSelected);
        console.log("BrassinList -> infoService.infoStream : colorTypeSelected", this.colorTypeSelected);
        console.log("BrassinList -> subscribeTypeCheckBoxChanged : typeListCheckBox", this.dataManager.typeListCheckBox);        
      }
    );
  }


  public subscribeHoublonCheckBoxChanged() {

    //console.log("XXXX BrassinList -> subscribeHoublonCheckBoxChanged");

    this.houblonCheckedService.infoStream.subscribe(
      houblons => {
        console.log("BrassinList -> subscribeHoublonCheckBoxChanged() : houblons", houblons);

        this.sortByVendable(null);

        this.popoverController.dismiss();
      }
    );
  }


  async sortHoublons($event) {
    const typePopOver = await this.popoverController.create({
      component: HoublonsCheckBox,
      event: event,
      translucent: true
    });
    await typePopOver.present();
  }


  public subscribeLevureCheckBoxChanged() {

    //console.log("XXXX BrassinList -> subscribeLevureCheckBoxChanged");

    this.levureCheckedService.infoStream.subscribe(
      levures => {
        console.log("BrassinList -> subscribeLevureCheckBoxChanged() : levures", levures);


        if (this.dataManager.levuresCheckedList.length > 0) {
          this.colorLevureSelected = "danger";
        } else {
          this.colorLevureSelected = "primary";
        }
        

        this.sortByVendable(null);

        this.popoverController.dismiss();
      }
    );
  }

  
  async sortLevures($event, idLevure) {
    const typePopOver = await this.popoverController.create({
      component: LevuresCheckBox,
      event: event,
      translucent: true
    });
    await typePopOver.present();
  }


  public getPastilles() {
    return this.dataManager.houblonsCheckedList["amerisant"].length + this.dataManager.houblonsCheckedList["aromatique"].length;
  }


  public setTitle() {

    if (this.stockageCategory) {
      this.volumeTotal = 0;
      this.dataManager.brassinsData.forEach(brassin => {
        if (brassin.embouteillage) {
          this.volumeTotal += brassin.embouteillage.volume
        };
      });
      this.title = "Mon stockage " + Math.round(this.volumeTotal) + "L";
    } else if (this.nextCategory) {
      this.title = "Next";
    } else {
      this.title = "Mes brassins";
    }
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
      case "épeautre" : color = "black"; break;
      default : color = "primary";
    }
    return color;
  }


  public itemTapped(event: any, brassin: Brassin, index: number) {

    console.log("XXX BrassinList -> itemTapped : lot / index:", brassin.lot, index);

    this.dataManager.appLoadedFromRoot = true;

    if (this.stockageCategory) {
      this.router.navigateByUrl('/brassins/stockage/' + brassin.id);
    } else {
      this.router.navigateByUrl('/brassins/list/' + brassin.id);
    }

    this.dataManager.idItemListSelected = "brassin_" + index;
    this.dataManager.currentDataList = this.brassins;
  }


  public ionChangeToggleVolumeDensite($event) {
    console.log("XXX BrassinList -> ionChangeToggleVolumeDensite : $event", $event);
   this.isDetailsVolumeDensiteDisplay = !this.isDetailsVolumeDensiteDisplay;
  }


  public setBrassinQuantity(event: any, brassin: Brassin, index: number, typeEmbouteillage: string, value: number){

    console.log("XXX BrassinList -> setBrassinQuantity : brassin lot / index / typeEmbouteillage / value :", brassin.lot, index, typeEmbouteillage, value);

    event.preventDefault();
    event.stopPropagation();

    document.getElementById("brassins_list_spinner_" + index).style.display= "inline-block";

    this.requestManager.setBrassinQuantity(brassin, typeEmbouteillage, value).then(res => {

      console.log("XXX BrassinList -> setBrassinQuantity / THEN : res", res);

      let _index = this.dataManager.getIndexById(this.dataManager.brassinsData, res.id);
      this.dataManager.brassinsData[_index] = res;

      _index = this.dataManager.getIndexById(this.brassins, res.id);
      this.brassins[_index] = res;
    });
  }


  async presentPopover(ev: any) {
    console.log("BrassinList -> presentPopover : dataManager.typeListCheckBox", this.dataManager.typeListCheckBox);    
      const typePopOver = await this.popoverController.create({
        component: TypesCheckBox,
        event: ev,
        translucent: true
      });
      await typePopOver.present();
  }


  public getLabelHoublons(brassin:Brassin): string {

    var label: string = "";

    if (brassin.ebulitions.length > 0) {

      //console.log("XXX BrassinList -> getLabelEmpatage : empatages", empatages);

      var lastEbulition = null;

      brassin.ebulitions.forEach((ebulition, i) => {

        if (ebulition.houblon) {

          if (lastEbulition && lastEbulition.duree) {
            if (lastEbulition.duree != ebulition.duree) {
              label += " / ";
            } else 
            {
              label += " - ";
            }
          }

          label += ebulition.houblon.short_name;

          lastEbulition = ebulition;
        }

      });

    }

    if (brassin.houblon_a_cru1) {
      label += " /// " + brassin.houblon_a_cru1.short_name;
    }

    if (brassin.houblon_a_cru2) {
      label += " /// " + brassin.houblon_a_cru2.short_name;
    }
    
    return label;
}


public getLabelEpices(brassin:Brassin): string {

  var label: string = "";

  if (brassin.ebulitions.length > 0) {

    //console.log("XXX BrassinList -> getLabelEmpatage : empatages", empatages);

    brassin.ebulitions.forEach((ebulition, i) => {

      if (ebulition.epice) {

        label += ebulition.epice.nom;

        // id sucres
        if (ebulition.epice.id === 6 || ebulition.epice.id === 7) {
          label += " (" + ebulition.quantite + "grs";

          if(brassin.volume_densite && brassin.volume_densite.d_debut_ebu) {
            label += " / " + brassin.volume_densite.d_debut_ebu + "°";
          }

          label += ")";
        }

        if (i < brassin.ebulitions.length - 1) {
          label += " / ";
        }
      }
    });
  }
  return label;
}


  public getLabelEmpatage(empatages:any): string {

      var label: string = "";

      if (empatages.length > 0) {

        //console.log("XXX BrassinList -> getLabelEmpatage : empatages", empatages);

        empatages.forEach((empatage, i) => {
          label += empatage.malt?empatage.malt.nom:empatage.flocon.nom;
          if (empatage.pourcentage){
            label += " (" + empatage.pourcentage + "%)";
          }
          if (i < empatages.length - 1) {
            label += ", "
          }
        });

      }
      
      return label;
  }


  public getLabelRendement(brassin:Brassin): string {

    var label: string = "";

    if (brassin.total_grain) {
      label += brassin.total_grain + "kg";
    }

    if (brassin.total_grain && brassin.volume_densite && brassin.volume_densite.v_debut_empatage) {
      var ratio: number = brassin.total_grain / brassin.volume_densite.v_debut_empatage * 1000;
      label += " - " + Math.round(ratio) +  "g/l";
    }

    if (brassin.total_grain && brassin.volume_densite && brassin.volume_densite.v_debut_empatage && brassin.volume_densite.d_fin_empatage) {
      var ratio: number = brassin.volume_densite.d_fin_empatage / brassin.total_grain / brassin.volume_densite.v_debut_empatage;
      label += " - rendement :" + Math.round(ratio * 100) / 100;
    }

    return label;
  }

  
  public getLabelDensite(brassin:Brassin): string {

    var label: string = "";

    if (brassin.volume_densite && brassin.volume_densite.v_debut_ebu && brassin.volume_densite.v_fin_ebu) {
      label += brassin.volume_densite.v_debut_ebu + "L -> " + brassin.volume_densite.v_fin_ebu + "L";
    }

    if (brassin.volume_densite && brassin.volume_densite.v_debut_ebu && brassin.volume_densite.d_fin_ebu) {
      label += " | ";
    }

    if (brassin.volume_densite && brassin.volume_densite && brassin.volume_densite.d_fin_ebu && brassin.volume_densite.d_embouteillage) {
      label += brassin.volume_densite.d_fin_ebu + "° -> " + brassin.volume_densite.d_embouteillage + "°";
    }

    return label;
  }


  public getLabelRendementDensite(brassin:Brassin): string {

    var label: string = "";

    if (brassin.total_grain && brassin.volume_densite && brassin.volume_densite.v_debut_empatage) {
      var ratio: number = brassin.total_grain / brassin.volume_densite.v_debut_empatage * 1000;
      label += Math.round(ratio) +  "g/l";
    }

    if (brassin.total_grain && brassin.volume_densite && brassin.volume_densite.v_debut_empatage && brassin.volume_densite.d_fin_empatage) {
      var ratio: number = brassin.volume_densite.d_fin_empatage / brassin.total_grain / brassin.volume_densite.v_debut_empatage;
      label += " - rendement : " + Math.round(ratio * 100) / 100;
    }

    if (brassin.volume_densite && brassin.volume_densite && brassin.volume_densite.d_fin_ebu && brassin.volume_densite.d_embouteillage) {
      label += " - " + brassin.volume_densite.d_fin_ebu + "° -> " + brassin.volume_densite.d_embouteillage + "°";
    }


    return label;
  }


  public getLabelNext(brassin:Brassin): string {

    var label: string = "";

    if (brassin.total_grain) {
      label += brassin.total_grain + "kg - " + brassin.volume_densite.v_debut_empatage + "L ";
    }

    if (brassin.volume_densite && brassin.volume_densite.v_debut_ebu && brassin.volume_densite.v_fin_ebu) {
      label += " / " + brassin.volume_densite.v_debut_ebu + "L -> " + brassin.volume_densite.v_fin_ebu + "L";
    }

    if (brassin.volume_densite && brassin.volume_densite && brassin.volume_densite.d_fin_ebu) {
      label += " : " + brassin.volume_densite.d_fin_ebu + "°";
    }

    if (brassin.ebulitions.length > 0) {
      let hasSucre: number = 0;
      brassin.ebulitions.forEach((ebulition, i) => {
        if (ebulition.epice) {
          // id sucres
          if (ebulition.epice.id === 6 || ebulition.epice.id === 7) {
            if (hasSucre === 0) {
              label += " / " + ebulition.quantite + "grs de sucre";
            } else {
              label += " + " + ebulition.quantite + "grs de sucre";
            } 
            hasSucre++;
          }
        }
      });
    }

    return label;
  }


  public getTropDeMousseArray (brassin: Brassin): number[] {
    let _array: number[] = [];
    for (var i = 0; i < brassin.trop_de_mousse; i ++) {
      _array.push(i);
    }
    return _array;
  }

}
