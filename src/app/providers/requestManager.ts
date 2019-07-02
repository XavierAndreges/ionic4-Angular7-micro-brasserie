import { Brassin } from './../models/types';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/toPromise';

//import { catchError, retry } from 'rxjs/operators';
//import {Observable} from 'rxjs';

import { DataManager } from './dataManager';


@Injectable()

export class RequestManager {

  /*
  ionic cordova run android --device
  ionic cordova platform add browser
  ionic cordova build browser
  */




  //baseURL: string = "http://192.168.43.89:8100";
    
 /*
  public baseURL: string = "http://localhost:8080";
  public urlSite: string = "/symfony2Brasserie/web/";
  public urlPage: string = "app_dev.php/api/";

  public AuthorizationKey: string = "Authorization";
  public AuthorizationValue: string = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE1ODQ0NDYzMTAsInVzZXJuYW1lIjoienV0IiwiaWF0IjoiMTU1MjkxMDMxMCJ9.Qhuuxkl2CPmR5pCL_S500tY7tA8Ybr2eRAkBwJL8IfFIfj8I8zMKlD9IHvoFAWwCXXCtQ5iL7MgH3ulwxs0E3V-enKwd2UYMC8Xelfhwnak7Urx9kUSI1vhsTF_DFf7NtpVP1ruicyahnVZKUl6P7xWVMKG41fTj_hTSZNGGiS1uxAOZPT6rUKuyT3jnogNP6ke18FA65KSK6ikf8Ft9piaYd5mE66D1DmGB_yFn6vARBWc1jz5urXT7W8R_N-w6--IOoAn0eq47zgp-k17UP7sLKmA5q-uV8O5Mr_FgGsO7BUqc0S13EAKG3DZH9Jadx3ZP9rf_FUkqvQPMk1-L66YzHef88BC79uPe3ahyCacrC-Oz8XXR1iMDF9guGn3wMPM7ShgZkOOwGcbK9pgsbbYlDVGwFPPxmessfonImcJ1C6h9GFU1tsjhHtAaFJhSs9caW2_jIjCRhKQQYsF1FwKHbFxldGwEflsS5gfRrN2Jcu5Us7fi6Bz3YEuaXNrf8po-mFVKdY_In_A7hRG7iHXEC6itdXkJ7zKKWU9yAwFA0TQV3G71QlvuWleMSsnyY54LH5Z4EIu4OQcBDNSOveUWL5JCIZ-ZLy4eeXPy2k2R-u4RzLDjK6qkqmo3o_817GcTn_dHiCDAsJp1y7JprEvWHe8Gej9uvlmdh-5VwUE";

*/
 

   
  public baseURL: string = "http://www.lajouquasse.fr";
  public urlSite: string = "/symfony2.8-Brasserie/www/";
  public urlPage: string = "app_dev.php/api/";

  public AuthorizationKey: string = "Authorization";
  public AuthorizationValue: string = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE1ODc4MDkzODYsInVzZXJuYW1lIjoienV0IiwiaWF0IjoiMTU1NjI3MzM4NiJ9.dekeYUqVDponPy3-Bch6fLT4QRam3j_ptxebdnPtuWQ0axqucsDOfqyP-v4jF8Tom4thdBqayaRE_wvq6B1WnUaBbR_RHaMjyaT6d4A9PX5eVnGwF7edjr57IDYmQSd8nbRHriEfLllA5DhReZWIXTb_pF15n56CAIvNGmjsUZPn-f3xL3KvSYAWx2p00BYoW_Zcd4qAWGROGglqqTBTcLzplaMqU_FTkginAbdqVKnU1pUQ8hVByp-MOdrfwtqAqHra4-8ELKz8tuL9daKOewoNB4bQZr8Jvh8cnkokva-8yauWAD4oQ5AyHZIFOaP87thxy4qQDj7u6mYZdUawGLluRfIRYDjKjybEk_MlBOltUBXxFNtqBgWHdh9xcdtjV9_D28VGQU59WE1NUL6gPx9oUME470e7SZk-kemL1_cM_FCXChPClCywstc4Bb3vs6LoSf554EcsCqzLFMJk0VOXCWp0_FHuA20_erieDePY2CU8IkQo0e3Q0pjyCcvGWT5JKA-f01Vysw9TBYejjZwesy_e47Dp7_3RPHoIBXiiMbOBznX-0h2LjFLEWuP5jV3cH972WMIcBqxljFUVnDviIGWigdLr4s6g2XEOPnhHmYFcw_q19Sy6us-K-3xigDUA1xyUWkbudlgaXj8b0Uv6HT3ldDyxkdQVA3EmPCw"
  
  /*
    baseURL: string = "http://lajouquasse.fr";
    urlSite: string = "/symfonyBrasserie/www/";
    public urlPage: string = "app_dev.php/";
   */

    constructor(
        public http: HttpClient,
        public dataManager: DataManager,
    ) {
    }


    public loginCheck(username: string, password: string): Promise<any> {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "login_check";

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
  
      let data = 
      '_username=' + username + '&' + 
      '_password=' + password;

      return this.http.post(url, data, httpOptions)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> loginCheck() : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> loginCheck() : err", err);
          return Promise.reject(err);
          }
      );
    }

    public logout() {
      localStorage.removeItem('token');
      console.log("RequestManager -> logout() : token / localStorage", localStorage.getItem("token"));
      //this.currentUserSubject.next(null);
    }




    public getBrassinsFromServer(): Promise<any> {
      
        let url: string = this.baseURL + this.urlSite + this.urlPage + "brassin/list";
        //alert(url);
   
        /*
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': this.AuthorizationValue
          })
        };
        */

        return this.http.get(url)
        .toPromise()
        .then(
            (res: any) => {
            console.log("RequestManager -> getBrassinsFromServer : res", res);
            return Promise.resolve(res);
            },
            err => { 
            console.error("RequestManager -> getBrassinsFromServer : err", err);
            return Promise.reject(err);
            }
        );
    }


    public setBrassinQuantity(brassin: any, typeEmbouteillage: string, value: number): Promise<any> {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "brassin/quantity/" + brassin.id + "/" + typeEmbouteillage + "/" + value;

      return this.http.get(url)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> setBrassinQuantity : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> setBrassinQuantity : err", err);
          return Promise.reject(err);
          }
      );
    }


    public setVendable(id: number, value: number): Promise<any> {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "brassin/vendable/" + id + "/" + value;

      return this.http.get(url)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> setVendable : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> setVendable : err", err);
          return Promise.reject(err);
          }
      );
    }


    public setTropDeMousse(id: number, value: number): Promise<any> {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "brassin/tropdemousse/" + id + "/" + value;

      return this.http.get(url)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> setVendable : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> setVendable : err", err);
          return Promise.reject(err);
          }
      );
    }


    public getLevuresFromServer(): Promise<any> {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "levure/list";
      return this.http.get(url)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> getLevuresFromServer : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> getLevuresFromServer : err", err);
          return Promise.reject(err);
          }
      );
  }


  public getIngredientQuantite(): Promise<any> {
    
      let url: string = this.baseURL + this.urlSite + this.urlPage + "quantite";

      //alert(url);
      return this.http.get(url)
      .toPromise()
      .then(
          (res: any) => {
          console.log("RequestManager -> getIngredientQuantite : res", res);
          return Promise.resolve(res);
          },
          err => { 
          console.error("RequestManager -> getIngredientQuantite : err", err);
          return Promise.reject(err);
          }
      );
  }

    
  public updateIngredient(category: string, item: any): Promise <any> {

    console.log("RequestManager -> updateIngredient() :  category / item", category, item);

    let promise = new Promise <any> ((resolve, reject) => {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "ingredient/update";
  
      let data = {
        "category": category,
        "id" : item.id,
        "commentaire" : item.commentaire?item.commentaire:"",
        "description" : item.description?item.description:""
      };

      console.log("RequestManager -> updateIngredient() :  url", url);
      console.log("RequestManager -> updateIngredient() :  data", data);

      return this.http.put(url, JSON.stringify(data))
      .toPromise()
      .then(
          res => {
            console.log("RequestManager -> updateIngredient : res", res);
            resolve(res);
          },
          err => { 
            console.error("RequestManager -> updateIngredient : err", err);
            reject(err);
          }
      );

    });

    return promise;
  }


  public updateBrassin(brassin: Brassin): Promise <any> {

    console.log("RequestManager -> updateBrassin : brassin", brassin);

    let promise = new Promise <any> ((resolve, reject) => {

      let url: string = this.baseURL + this.urlSite + this.urlPage + "brassin/update";
  
      let data = {
        "id" : brassin.id,
        "commentaire" : brassin.commentaire
      };

      return this.http.put(url, JSON.stringify(data))
      .toPromise()
      .then(
          res => {
            console.log("RequestManager -> updateBrassin : res", res);
            resolve(res);
          },
          err => { 
            console.error("RequestManager -> updateBrassin : err", err);
            reject(err);
          }
      );

    });

    return promise;
  }


  public loadIngredientsList() {
    if (!this.dataManager.ingredientQuantiteDict) {
      this.getIngredientQuantite().then(res => {
        this.dataManager.ingredientQuantiteDict = res;  
        //console.log("RequestManager -> loadIngredientsList() : ingredientQuantiteDict", this.dataManager.ingredientQuantiteDict);
      })
      .catch((Error: HttpErrorResponse) => {
        console.log("RequestManager -> loadIngredientsList : get IngredientQuantiteDict / ERROR", Error);
      })
    }
  }

}
