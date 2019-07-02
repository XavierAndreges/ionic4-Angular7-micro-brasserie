export interface Brassin {
    "id": number,
    "lot": string, 
    "embouteillage": Embouteillage,
    "empatage": any,
    "type_biere" : TypBiere,
    "total_grain" ? : number,
    "levure" ? : Levure,
    "houblon_amerisant1" ? : Houblon,
    "houblon_amerisant2" ? : Houblon,
    "houblon_aromatique1" ? : Houblon,
    "houblon_aromatique2" ? : Houblon,
    "houblon_a_cru1" ? : Houblon,
    "houblon_a_cru2" ? : Houblon,
    "volume_densite" ? : any,
    "vendable": any,
    "trop_de_mousse": number,
    "labelLevureDensite" ? : string,
    "commentaire" ? : string;
    "ebulitions" ?: any
  }

  export interface Embouteillage {
    "id": number,
    "nb25": number,
    "nb33": number,
    "nb50": number,
    "nb66": number,
    "nb75": number,
    "volume": number
  }

  export interface TypBiere {
    "id": number,
    "nom": string
  }

  export interface Houblon {
    "id": number,
    "nom": string,
    "short_name": string
  }

  export interface Levure {
    "id": number,
    "nom": string
  }

  export interface IngredientQuantite {
    "malt": any[],
    "houblon": any[],
    "flocon": any[],
    "epice": any[],
    "levure": any[]
  }

  export interface RouteParams {
    "id": number,
    "index": number
    "nom": string
  }