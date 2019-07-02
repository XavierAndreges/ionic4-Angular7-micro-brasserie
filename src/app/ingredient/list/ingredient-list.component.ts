import { Component, OnInit } from '@angular/core';
import { RequestManager } from '../../providers/requestManager';
import { DataManager } from '../../providers/dataManager';
import { UtilsService } from '../../shared/utilsService';
import { LoadingController, AlertController } from '@ionic/angular';
import { Brassin, IngredientQuantite, RouteParams } from '../../models/types';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemTappedIngredientService } from '../../shared/infoService';


@Component({
  selector: 'brasserie-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})


export class IngredientListComponent implements OnInit {

  public isLoadingController: boolean = true;
  public ingredientQuantiteDict: IngredientQuantite = null
  public ingredients:  any = [];
  public title: string;
  public category: string;
  public isDisplayAll: boolean = false;

  constructor(
    public requestManager: RequestManager,
    public dataManager: DataManager,
    public utilsService: UtilsService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private itemTappedIngredientService: ItemTappedIngredientService
  ) { }


  ngOnInit() {
    //this.dataManager.idItemListSelected = "";
    console.log("IngredientListComponent -> ngOnInit() : this.dataManager.idItemListSelected", this.dataManager.idItemListSelected);
    this.subscribeItemTappedIngredientService();
  }

  
  public ionViewDidEnter() {

    this.utilsService.setStatusBar();

    if (this.dataManager.ingredientQuantiteDict === null){
      this.loadList(null);  
    } else {
      this.doActions();
    }    
  }
  

  public loadList(event: any) {

    console.log("IngredientListComponent => loadList : event", event);

    if (!event)
      this.presentLoading();

    this.requestManager.getIngredientQuantite().then(res => {

      this.dataManager.ingredientQuantiteDict = res;

      this.doActions();

      if (event) {
        event.target.complete();
      } else {
        this.loadingController.dismiss();
        this.isLoadingController = false;
      }    
    })
    .catch((Error: HttpErrorResponse) => {

      console.log("IngredientListComponent -> loadBrassinsList : getBrassinsFromServer / ERROR", Error);
      this.presentAlert(Error, "getBrassinsFromServer");

      if (this.isLoadingController) {
        this.loadingController.dismiss();
        this.isLoadingController = false;
      }
      if (event) {
        event.target.complete();
      }
    });
  }


  public subscribeItemTappedIngredientService() {
    this.itemTappedIngredientService.infoStream.subscribe(
      params => {
        console.log("IngredientListComponent -> subscribeItemTappedIngredientService() : params", params);
        this.itemTapped(null, params.nom, params.id, params.index);
      }
    );
  }


  public itemTapped(event: any, nom: string, id:number, index:number) {

    console.log("XXX IngredientListComponent -> itemTapped : nom / id :", nom, id);

    this.dataManager.appLoadedFromRoot = true;

    this.router.navigateByUrl('/ingredient/' + this.category + "/" + id);

    this.dataManager.idItemListSelected = "ingredient_" + index;
    
  }


  public doActions() {

    this.category = this.route.snapshot.paramMap.get('category');
    console.log("IngredientListComponent => doActions : category", this.category);

    this.title = "Mes " + this.category + "s";

    this.setIngredients();
    //qconsole.log("IngredientListComponent -> doActions : ingredients", this.ingredients); 

    this.scrollTo();
  }


  public setIngredients() {
    if (this.category === "houblon") {
      this.ingredients = this.dataManager.sortHoublons();
    } else {
      this.ingredients = this.dataManager.ingredientQuantiteDict[this.category];
    }
  }


  public ionChangeToggle($event) {
    console.log("XXX BrassinList -> ionChangeToggle : $event", $event);
    this.dataManager.isDisplayAllHoublon = !this.dataManager.isDisplayAllHoublon;
    this.setIngredients();
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


  async presentAlert(Error: HttpErrorResponse , texte: string) {
    const alert = await this.alertController.create({
        header: 'ERROR',
        subHeader: 'Status' + Error.status,
        message: texte + " => " + Error.statusText,
        buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      translucent: true,
    });
    return await loading.present();
  }
}
