import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, Platform, AlertController } from '@ionic/angular';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';

import { UtilsService } from '../../shared/utilsService';
import { RequestManager } from '../../providers/requestManager';
import { DataManager } from '../../providers/dataManager';


@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})


export class IngredientDetailComponent implements OnInit {


  public item: any = null;
  public id: number;
  public index: number;
  public category: string;
  public imageUrl: string;
  public title: string;
  public ingredients: any[];
  public inputReadOnly: boolean = true;


  constructor(
    public http: HttpClient,
    public requestManager: RequestManager,
    public dataManager: DataManager,
    public loadingController: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    public alertController: AlertController,
    public utilsService: UtilsService
  ) {
    this.presentLoading();
   }


  ngOnInit() {

    console.log("IngredientDetailComponent => ngOnInit : this.dataManager.ingredientQuantiteDict", this.dataManager.ingredientQuantiteDict);

    if (!this.dataManager.ingredientQuantiteDict) {
        this.requestManager.getIngredientQuantite().then(res => {
        this.dataManager.ingredientQuantiteDict = res;
        this.setCurrentParameters();
          });
    } else {
        this.setCurrentParameters();
    }
  }


  public setCurrentParameters() {

      this.category = this.activatedRoute.snapshot.paramMap.get('category');
      console.log("IngredientDetailComponent => setCurrentItem : category", this.category);

      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      console.log("IngredientDetailComponent => setCurrensetCurrentItemtBrassin : id", this.id);

      this.setIngredients();  

      this.index = this.dataManager.getIndexById(this.ingredients, this.id);
      console.log("IngredientDetailComponent => setCurrentBsetCurrentItemrassin : getIndexById", this.index); 

      if (this.dataManager.idItemListSelected == "") {
        this.dataManager.idItemListSelected = "ingredient_" + this.index;
      }

      this.updateItem();

      this.backButtonEvent();

      setTimeout(() => {
          this.loadingController.dismiss();
      }, 1000);
  }


  public setIngredients() {
    if (this.category === "houblon") {
      this.ingredients = this.dataManager.sortHoublons();
    } else {
      this.ingredients = this.dataManager.ingredientQuantiteDict[this.category];
    }
  }


  public updateItem() {

    this.item = this.ingredients[this.index];
    console.log("IngredientDetailComponent => updateItem : item", this.item);

    if (this.item.files && this.item.files.length > 0) {
      this.imageUrl = this.requestManager.baseURL + this.requestManager.urlSite + "files/" + this.item.files[0].file_name;
    }

    this.title = this.item.nom;
  }


  public ionChangeToggleEditer(event) {
    this.inputReadOnly = !this.inputReadOnly;
    //console.log("IngredientDetailComponent => ionChangeToggleEditer : item", this.item);
    if (this.inputReadOnly) {
      this.presentLoading();
      this.requestManager.updateIngredient(this.utilsService.firstLetterCapital(this.category), this.item)
      .then((res: any) => {
        console.log("IngredientDetailComponent => ionChangeToggleEditer : updateIngredient OK");
        this.loadingController.dismiss();
      }).catch((Error: HttpErrorResponse) => {
        console.log("IngredientDetailComponent => ionChangeToggleEditer : updateIngredient / ERROR", Error);
        this.presentAlert(Error, "updateIngredient");
        this.loadingController.dismiss();
      });
    }
  }


  public ionChangeTextArea(event, type) {
    //console.log("IngredientDetailComponent => ionChangeTextArea : event", event);
    this.item[type] = event.detail.value;
  }


  public backButtonEvent() {
    var backButton = document.querySelector(".sc-ion-back-button-md-h");
    //console.log("IngredientDetailComponent => constructor : backButton", backButton);
    if (!this.dataManager.appLoadedFromRoot && backButton) {
        (document.querySelector(".back-custom-btn") as HTMLElement).style.display = "block";
    }
    this.platform.backButton.subscribe(async () => {    
        if (!this.dataManager.appLoadedFromRoot) {
            this.launchBackAction();
        }
    });
  };


  public launchBackAction() {
    //console.log("XXX IngredientDetailComponent -> launchBackAction : this.category", this.category);
    this.router.navigateByUrl('/ingredient/' + this.category);
  }


  public prevOrNextPage(type) {
    console.log("XXX IngredientDetailComponent -> segmentChanged : type", type);

    if (type === "next") {
      if (this.index + 1 < this.ingredients.length) {
        this.index++;
      } else {
        this.index = 0;
      }
    } else {
      if (this.index - 1 >= 0) {
        this.index--;
      } else {
        this.index = this.ingredients.length - 1;
      }
    }

    this.updateItem();
  }


  async presentLoading() {
      const loading = await this.loadingController.create({
      translucent: true,
      });
      return await loading.present();
  }


  async presentAlert(Error: HttpErrorResponse , texte: string) {
      const alert = await this.alertController.create({
          header: 'ERROR',
          subHeader: 'Status' + Error.status,
          message: texte + " => " + Error.statusText,
          buttons: ['OK']
      });
      await alert.present();
  }

}
