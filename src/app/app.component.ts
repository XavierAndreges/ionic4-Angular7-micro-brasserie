import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, ModalController, ActionSheetController, PopoverController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NavigationService } from './shared/navigation.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;


  public appPages = [
    {
        title: 'Stockage',
        url: '/brassins/stockage',  
        icon: 'beer'
    },
    {
      title: 'Brassins',
      url: '/brassins/list',
      icon: 'list'
    },
    {
      title: 'Next',
      url: '/brassins/next',
      icon: 'arrow-forward'
    },
    {
      title: 'Malts',
      url: '/ingredient/malt',
      icon: 'archive'
    },
    {
      title: 'Flocons',
      url: '/ingredient/flocon',
      icon: 'snow'
    },
    {
      title: 'Houblons',
      url: '/ingredient/houblon',
      icon: 'leaf'
    },
    {
      title: 'Epices',
      url: '/ingredient/epice',
      icon: 'planet'
    },
    {
      title: 'Levures',
      url: '/ingredient/levure',
      icon: 'bonfire'
    }
    ,
    {
      title: 'Login',
      url: '/login',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.initializeApp();

    // Initialize BackButton Eevent.
    this.backButtonEvent();
  }


  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  // active hardware back button
  backButtonEvent() {

    this.platform.backButton.subscribe(async () => {

        console.log("XXX BrassinDetail -> backButtonEvent : AppComponent");

        // close action sheet
        try {
            const element = await this.actionSheetCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close popover
        try {
            const element = await this.popoverCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close modal
        try {
            const element = await this.modalCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
            console.log(error);

        }

        // close side menua
        try {
            const element = await this.menu.getOpen();
            if (element !== null) {
                this.menu.close();
                return;

            }

        } catch (error) {

        }

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            if (outlet && outlet.canGoBack()) {
                outlet.pop();

            } else if (this.router.url === '/home') {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    // this.platform.exitApp(); // Exit from app
                    navigator['app'].exitApp(); // work in ionic 4

                } else {
                  /*
                    this.toast.show(
                        `Press back again to exit App.`,
                        '2000',
                        'center')
                        .subscribe(toast => {
                            // console.log(JSON.stringify(toast));
                        });
                        */
                    this.lastTimeBackPress = new Date().getTime();
                }
            }
        });
    });
}


}
 