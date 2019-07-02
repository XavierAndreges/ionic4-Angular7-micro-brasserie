import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoadingController, Platform, AlertController } from '@ionic/angular';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { RequestManager } from '../../providers/requestManager';
import { DataManager } from '../../providers/dataManager';
import { Brassin } from './../../models/types';
import { NavigationService } from './../../shared/navigation.service'

@Component({
  selector: 'app-detail',
  templateUrl: 'brassinDetail.html',
  styleUrls: ['brassinDetail.scss'],
})

export class BrassinDetail implements OnInit {

    public brassin: Brassin = null;
    public index: number;
    public id: number;
    public category: string;
    public vendable: boolean = false;
    public inputReadOnly: boolean = true;
    public isAvailableForRequest: boolean = true;

    constructor(
        private http: HttpClient,
        private requestManager: RequestManager,
        private dataManager: DataManager,
        private loadingController: LoadingController,
        private router: Router,
        private route: ActivatedRoute,
        private platform: Platform,
        private alertController: AlertController,
        private navigationService: NavigationService,
        private location: Location
    ) {
        this.presentLoading();
    }


    public ngOnInit() {

        console.log("BrassinDetail => init : this.dataManager.brassinsData", this.dataManager.brassinsData);

        if (this.dataManager.brassinsData.length === 0) {
            this.requestManager.getBrassinsFromServer().then(res => {
                this.dataManager.brassinsData = res;
                this.dataManager.currentDataList = res;
                this.doActions();
              });
        } else {
            this.doActions();
        }

        this.requestManager.loadIngredientsList();
    }


    private doActions(): void {

        this.setCurrentParameters();

        this.backButtonEvent();

        setTimeout(() => {
            this.loadingController.dismiss();
        }, 1000);

    }


    public setCurrentParameters() {

        this.category = this.route.snapshot.paramMap.get('category');
        console.log("BrassinDetail => setCurrentBrassin : category", this.category);

        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        console.log("BrassinDetail => setCurrentBrassin : id", this.id);

        this.index = this.dataManager.getIndexById(this.dataManager.currentDataList, this.id);
        console.log("BrassinDetail => setCurrentBrassin : getIndexById", this.index); 

        if (this.dataManager.idItemListSelected == "") {
            this.dataManager.idItemListSelected = "brassin_" + this.index;
            console.log("BrassinDetail => setCurrentBrassin : idItemListSelected", this.dataManager.idItemListSelected );
        }

        this.updateItem();
    }


    public updateItem(){
        this.brassin = this.dataManager.currentDataList[this.index];
        console.log("BrassinDetail => setCurrentBrassin : brassin", this.brassin);
        
        this.vendable = this.brassin.vendable;

        console.log("BrassinDetail => updateItem() : this.vendable", this.vendable);

        this.location.go('/brassins/' + this.category + '/' + this.brassin.id );
    }


    public prevOrNextPage(type: string) {
        this.index = this.navigationService.getPrevOrNextIndex(type, this.index, this.dataManager.currentDataList);
        this.isAvailableForRequest = false;
        this.updateItem();
        setTimeout(() => {this.isAvailableForRequest = true;}, 4000);   
    }


    public ionChangeToggleEditer(event) {
        this.inputReadOnly = !this.inputReadOnly;
        console.log("IngredientDetailComponent => ionChangeToggleEditer : inputReadOnly", this.inputReadOnly);
        
        console.log("IngredientDetailComponent => ionChangeToggleEditer : brassin", this.brassin);
        
        if (this.inputReadOnly) {
            document.getElementById("brassin_detail_spinner_commentaire").style.display= "inline-block";
            if (!this.brassin.commentaire) {
                this.brassin.commentaire = "";
            }
            this.requestManager.updateBrassin(this.brassin)
            .then(() => {
                document.getElementById("brassin_detail_spinner_commentaire").style.display= "none";
            })
            .catch((Error)=> {
                document.getElementById("brassin_detail_spinner_commentaire").style.display= "none";
                this.presentAlert(Error, "getBrassinsFromServer");
            });
        }
    }
      
      
    public ionChangeTextArea(event, type) {
        //console.log("IngredientDetailComponent => ionChangeTextArea : event", event);
        this.brassin[type] = event.detail.value;
    }


    public ionChangeToggleVendable(event) {

        console.log("XXX BrassinDetail -> ionChangeToggleVendable : event :", event);

        if (this.isAvailableForRequest) {

            var vendable = event.detail.checked == true ? 1 : 0;

            document.getElementById("brassin_detail_spinner_vendable").style.display= "inline-block";

            this.requestManager.setVendable(this.brassin.id, vendable)
            .then(res => {
                let _index = this.dataManager.getIndexById(this.dataManager.brassinsData, this.brassin.id);
                this.dataManager.brassinsData[_index] = res;
                this.brassin = res;     
                this.brassin.vendable = res.vendable == "1" ? true : false; 
                document.getElementById("brassin_detail_spinner_vendable").style.display= "none";       
            })
            .catch((Error)=> {
                this.vendable = false;
                document.getElementById("brassin_detail_spinner_vendable").style.display= "none";
                this.presentAlert(Error, "getBrassinsFromServer");
            });
        }
    }


    public ionChangeSelectTropDeMousse(event) {

        console.log("XXX BrassinDetail -> ionChangeSelectTropDeMousse : event :", event);

        if (this.isAvailableForRequest && this.brassin && this.brassin.trop_de_mousse !== parseInt(event.detail.value)) {

            document.getElementById("brassin_detail_spinner_tropDeMousse").style.display= "inline-block";

            this.requestManager.setTropDeMousse(this.brassin.id, parseInt(event.detail.value)).then(res => {

                let index = this.dataManager.getIndexById(this.dataManager.brassinsData, this.brassin.id);
                this.dataManager.brassinsData[index] = res;
                this.brassin = res;   
                document.getElementById("brassin_detail_spinner_tropDeMousse").style.display= "none";         
                })
                .catch((Error)=> {
                    document.getElementById("brassin_detail_spinner_tropDeMousse").style.display= "none"; 
                    this.presentAlert(Error, "getBrassinsFromServer");
                });
        }
    }
    


    public backButtonEvent() {
        var backButton = document.querySelector(".sc-ion-back-button-md-h");
        //console.log("BrassinDetail => constructor : backButton", backButton);
        if (!this.dataManager.appLoadedFromRoot) {
            (document.querySelector(".back-custom-btn") as HTMLElement).style.display = "block";
        }  
        this.platform.backButton.subscribe(async () => {    
            //console.log("XXX BrassinDetail -> backButtonEvent : subscribe");
            if (!this.dataManager.appLoadedFromRoot) {
                this.launchBackAction();
            }
        });
    };


    public launchBackAction() {

        console.log("XXX BrassinDetail -> launchBackAction : this.category", this.category);

        if (this.category === "stockage") {
            this.router.navigateByUrl('/brassins/stockage');
        } else {
            this.router.navigateByUrl('/brassins/list');
        }
    }
    

    public itemTapped(event: any, brassin: Brassin){
        console.log("XXX BrassinDetail -> itemTapped : brassin lot :", brassin.lot);
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
