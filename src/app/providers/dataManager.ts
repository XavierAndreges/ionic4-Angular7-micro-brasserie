import { Brassin, IngredientQuantite } from './../models/types';
import { Injectable } from '@angular/core';

import { UtilsService } from '../shared/utilsService';


@Injectable()

export class DataManager {

    public brassinsData: Brassin[] = [];
    public currentDataList: any[] = [];

    public houblonsCheckedList: any = {'amerisant' : [], 'aromatique': []};
    public levuresCheckedList: any = [];

    public limitDureeType = 40;

    public ingredientQuantiteDict: IngredientQuantite = null;

    public type: string;
    public typeList: string[];
    public typeListCheckBox: any;
    public tropDeMousse: string[];

    public appLoadedFromRoot: boolean = false;
    public lastUrl: string = ""

    public typeSelected: string = "Type";
    public isListBrassinsReversed: boolean = true;

    public isDisplayAllHoublon: boolean = false;

    public idItemListSelected: string = "";

    public euroBtnSelected: boolean = false;
    public colorEuroBtn = "primary";

    public levures:any[] = [];

    constructor(
        private utilsService: UtilsService
    ) {

        this.typeList = [
            "blonde", "brune", "ambrée", "blanche", "rouge", "seigle", "triple", "épeautre"
        ]

        this.typeListCheckBox = {
            "blonde": false,
            "brune": false,
            "ambrée": false,       
            "blanche" : false,
            "rouge" : false,
            "seigle" : false,
            "triple" : false,
            "épeautre" : false
        }

        this.tropDeMousse = [
            "0", "1", "2", "3", "4"
        ]
    }


    public getIndexById(_array: any, id: number) {
        var index: number;
        _array.forEach((item, i) => {
            if (item.id === id) {
               index = i;
            }       
        });
        return index;
    }

    
    public sortBrassinsDataByType(data: Brassin[], type: string): Brassin[] {
        //console.log("DataManager => sortBrassinsDataByType : brassinsData", this.brassinsData);
        var brassins = [];
        data.forEach(brassin => {
            if (brassin.type_biere.nom === type) {
                brassins.push(brassin);
            }       
        });
        console.log("DataManager => sortBrassinsDataByType : brassins", brassins);
        return brassins;     
    }


    public sortBrassinsByVendable(data: Brassin[]): Brassin[] {
        var brassins = [];
        data.forEach(brassin => {
            if (brassin.vendable) {
                brassins.push(brassin);
            }       
        });
        console.log("DataManager => sortBrassinsDataByType : brassins", brassins);
        return brassins;     
    }


    public sortBrassinsByLevure(data: Brassin[], idLevure): Brassin[] {
        var brassins = [];
        data.forEach(brassin => {
            if (brassin.levure && brassin.levure.id == idLevure) {
                brassins.push(brassin);
            }       
        });
        console.log("DataManager => sortBrassinsByLevure : brassins", brassins);
        return brassins;     
    }



    public sortBrassinsByNext(data: Brassin[]): Brassin[] {
        var brassins = [];
        this.utilsService.deepClone(data).forEach((brassin, i) => {
            brassin.lot = brassin.lot.replace(/[ab]+/g, "");  

            if (i == 0) {

                if (brassin.levure && brassin.volume_densite && brassin.volume_densite.d_embouteillage) {
                    brassin.labelLevureDensite = brassin.levure.nom + " : " + brassin.volume_densite.d_embouteillage + "°";
                }    

                brassins.push(brassin);

            } else if (brassins.length > 0) {
            
             if (brassins[brassins.length-1].lot != brassin.lot) {

                if (brassin.levure && brassin.volume_densite && brassin.volume_densite.d_embouteillage) {
                    brassin.labelLevureDensite = brassin.levure.nom + " : " + brassin.volume_densite.d_embouteillage + "°";
                } 
                brassins.push(brassin);    

             } else {

                let _brassin = brassins[brassins.length-1];

                if (brassin.levure && brassin.volume_densite && brassin.volume_densite.d_embouteillage) {
                    _brassin.labelLevureDensite += " - " + brassin.levure.nom + " : " + brassin.volume_densite.d_embouteillage + "°";
                } 

             }

            }     
        });
        console.log("DataManager => sortBrassinsByNext : brassins", brassins);
        return brassins;     
    }
    

    public getHoublonsOnlyUsed(){

        let houblonsList= [];

        this.ingredientQuantiteDict['houblon'].forEach((houblon, i) => {
            if (houblon.ebulition && houblon.ebulition.length > 0) {
                houblonsList.push(houblon);
            }
        });

        return houblonsList;
    }


    public sortBrassinsByHoublons(brassins:Brassin[]): Brassin[] {

        var _brassins = [];

        let houblons: any[] = this.houblonsCheckedList;
        
        brassins.forEach(brassin => {

            if (brassin.ebulitions && brassin.ebulitions.length > 0) {

                let isInsideAmerisant: boolean = false;
                let isInsideAromatique: boolean = false;

                let isInsideAmerisants: boolean = true;
                let isInsideAromatiques: boolean = true;

                if (houblons['amerisant'].length == 1) {

                    isInsideAmerisant = this.isBrassinInside(brassin, houblons, 'amerisant');

                } else if (this.getNbHoublons(brassin, 'amerisant') == houblons['amerisant'].length) {   

                    isInsideAmerisants = this.areBrassinsInside(brassin, houblons, 'amerisant');

                } else {

                    isInsideAmerisants = false;
                }
             

                if (houblons['aromatique'].length == 1) {

                    isInsideAromatique = this.isBrassinInside(brassin, houblons, 'aromatique');

                } else if (this.getNbHoublons(brassin, 'aromatique') == houblons['aromatique'].length) {
                    
                    isInsideAromatiques = this.areBrassinsInside(brassin, houblons, 'aromatique');

                } else {

                    isInsideAromatiques = false;
                }

                if (brassin.lot == "51") {
                    console.log("DataManager => sortBrassinsByHoublons : ************  51 ************");
                    console.log("DataManager => sortBrassinsByHoublons : isInsideAmerisant", isInsideAmerisant);
                    console.log("DataManager => sortBrassinsByHoublons : isInsideAromatique", isInsideAromatique);
                    console.log("DataManager => sortBrassinsByHoublons : isInsideAmerisants", isInsideAmerisants);
                    console.log("DataManager => sortBrassinsByHoublons : isInsideAromatiques", isInsideAromatiques);
                }

                if ((houblons['amerisant'].length == 1 && isInsideAmerisant && houblons['aromatique'].length == 0)
                    ||(houblons['aromatique'].length == 1 && isInsideAromatique && houblons['amerisant'].length == 0)
                    ||(houblons['amerisant'].length == 1 && isInsideAmerisant && houblons['aromatique'].length == 1 && isInsideAromatique)) {

                    _brassins.push(brassin);

                } else if ((houblons['amerisant'].length > 1 && isInsideAmerisants && houblons['aromatique'].length == 0)
                || (houblons['amerisant'].length > 1 && isInsideAmerisants && houblons['aromatique'].length == 1 && isInsideAromatique)
                ||(houblons['aromatique'].length > 1 && isInsideAromatiques && houblons['amerisant'].length == 0)
                ||(houblons['aromatique'].length > 1 && isInsideAromatiques && houblons['amerisant'].length == 1 && isInsideAmerisant)
                ||(houblons['amerisant'].length > 1 && isInsideAmerisants && houblons['aromatique'].length > 1 && isInsideAromatiques))  {

                    _brassins.push(brassin);

                }
            }
        });
        
        console.log("DataManager => sortBrassinsByHoublons : _brassins", _brassins);

        return _brassins;     
    }


    public isBrassinInside(brassin: Brassin, houblons: any, type: string): boolean {
        let isInside = false;
        brassin.ebulitions.forEach((ebulition, i) => {
            if (type == "amerisant" && ebulition.duree > this.limitDureeType && ebulition.houblon && houblons[type].find(id => ebulition.houblon.id == id)) {
                isInside =  true;
            }
            if (type == "aromatique" && ebulition.duree <= this.limitDureeType && ebulition.houblon && houblons[type].find(id => ebulition.houblon.id == id)) {
                isInside =  true;
            }   
        });
        return isInside;
    }

    public areBrassinsInside(brassin: Brassin, houblons: any, type: string): boolean {
        let isInside = true;
        brassin.ebulitions.forEach((ebulition, i) => {
            if (type == "amerisant" && ebulition.duree > this.limitDureeType && ebulition.houblon && !houblons[type].find(id => ebulition.houblon.id == id)) {
                isInside =  false;
            }
            if (type == "aromatique" && ebulition.duree <= this.limitDureeType && ebulition.houblon && !houblons[type].find(id => ebulition.houblon.id == id)) {
                isInside =  false;
            }   
        });
        return isInside;
    }


    public getNbHoublons(brassin: Brassin, type: string) {
        let nbHoublons: number = 0;
        brassin.ebulitions.forEach((ebulition, i) => {
            if (type == "amerisant" && ebulition.houblon && ebulition.duree > this.limitDureeType) {
                nbHoublons++;
            }
            if (type == "aromatique" && ebulition.houblon && ebulition.duree <= this.limitDureeType) {
                nbHoublons++;
            }                    
        });
        return nbHoublons;
    }


    public sortBrassinsByLevures(brassins:Brassin[]): Brassin[] {
        var _brassins = [];
        brassins.forEach(brassin => {
            if (brassin.levure && this.levuresCheckedList.find(id => brassin.levure.id == id)) {
                _brassins.push(brassin);
            }
        })
        return _brassins;
    }


    public sortHoublons():any[] {
        let _ingredients: any[] = [];
        if (this.isDisplayAllHoublon) {
            _ingredients = this.ingredientQuantiteDict['houblon'];
        } else {      
            this.ingredientQuantiteDict['houblon'].forEach((item, i) => {
                if (item.ebulition && item.ebulition.length > 0) {
                    _ingredients.push(item);
                }
            });
        }  
        //console.log("DataManager -> sortHoublons : _ingredients", _ingredients);
        return _ingredients;   
    }
}
