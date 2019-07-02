import { RequestManager } from './../providers/requestManager';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../shared/alert.service';

//import { AuthenticationService } from '../_services';

@Component({
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    login: boolean = false;
    return: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private requestManager: RequestManager,
        private alertService: AlertService
    ) {
    }



    public ngOnInit() {

      console.log("LoginComponent -> logngOnInitnCheck() : token / localStorage", localStorage.getItem("token"));

      if (localStorage.getItem("token")) {
        this.login = true;
      }

      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
    }


    public ionViewDidEnter() {

      if (localStorage.getItem("token")) {
        this.login = true;
      } else {
        this.login = false;
      }

      this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
    }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }



   public onSubmit() {

    console.log("XXX LoginComponent => onSubmit()");

      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.alertService.presentLoading();

      this.requestManager.loginCheck(this.f.username.value, this.f.password.value)
      .then((res) => {
        localStorage.setItem("token", res.token);
        console.log("LoginComponent -> loginCheck() : token / localStorage", localStorage.getItem("token"));
        this.alertService.loadingController.dismiss();
        this.login= true;
        this.router.navigateByUrl(this.return);
      })
      .catch((Error: HttpErrorResponse) => {
        this.alertService.presentAlert(Error, "loginCheck");
        this.alertService.loadingController.dismiss();
        this.login = false;
      });
  }


  public logout($event) {
    this.requestManager.logout();
    this.login = false;
  }

}

