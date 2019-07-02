import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Brassin, RouteParams } from '../models/types';

@Injectable()

export class InfoService {

  private _infoSubject = new Subject<string>();

  public infoStream = this._infoSubject.asObservable();

  constructor() { }

  public dispatchInfo(type: string) {
    this._infoSubject.next(type);
  }

}

export class HoublonCheckedService {

  private _infoSubject = new Subject<any[]>();

  public infoStream = this._infoSubject.asObservable();

  constructor() { }

  public dispatchInfo(houblons: any[]) {
    this._infoSubject.next(houblons);
  }
}

export class LevureCheckedService {

    private _infoSubject = new Subject<any[]>();
  
    public infoStream = this._infoSubject.asObservable();
  
    constructor() { }
  
    public dispatchInfo(levures: any[]) {
      this._infoSubject.next(levures);
  }

}

export class ItemTappedIngredientService {

  private _infoSubject = new Subject<RouteParams>();

  public infoStream = this._infoSubject.asObservable();

  constructor() { }

  public dispatchInfo(params: RouteParams) {
    this._infoSubject.next(params);
  }

}