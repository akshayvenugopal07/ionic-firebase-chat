import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  users: any;
  userList: any;

  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    private alertCtrl: AlertController,
    public navParams: NavParams) {

    this.users = db.collection('users').snapshotChanges();

    this.users.subscribe((resp) => {
      this.userList = resp.map(function (item) {
        let obj = {
          data: item.payload.doc.data(),
          id: item.payload.doc.id
        };
        return obj;
      });
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignupTap() {
    this.navCtrl.setRoot(SignupPage);
  }

  onLogin() {
    if(this.userList){
      var found = this.userList.find((user) => {
        return ((user.data.email == this.email) && (user.data.password == this.password));
      });
      if(found){
        let userData = {
          email: this.email,
          password: this.password,
          username: found.data.username
        };
        this.navCtrl.setRoot(HomePage, { data: userData});
      } else {
        this.showAlert('Error', 'Incorrect email or password', ['OK']);
      }
    }
  }

  showAlert(title, message, buttons) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: buttons
    });
    alert.present();
  }

}
