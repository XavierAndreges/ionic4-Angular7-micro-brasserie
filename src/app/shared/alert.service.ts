import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingController, AlertController, PopoverController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }


  async presentAlert(Error: HttpErrorResponse , texte: string) {
    const alert = await this.alertController.create({
        header: 'ERROR',
        subHeader: 'Status ' + Error.status,
        message: texte + " => " + Error.statusText + " / " + Error.error.message,
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
