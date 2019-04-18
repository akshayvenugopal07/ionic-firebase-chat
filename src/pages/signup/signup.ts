import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userDetails = {
    email: '',
    username: '',
    password: '',
    confirm: ''
  };

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
    console.log('ionViewDidLoad SignupPage');
  }

  onLoginTap() {
    this.navCtrl.setRoot(LoginPage);
  }

  createAccount() {
    if ((this.userDetails.email) && (this.userDetails.username) && (this.userDetails.password) && (this.userDetails.confirm)){
      if(this.userDetails.password != this.userDetails.confirm){
        this.showAlert('Password Mismatch', 'The passwords you entered do not match Please try again', ['OK']);
      } else {
        var found = this.userList.find( (user) => {
          return ((user.data.email == this.userDetails.email) || (user.data.username == this.userDetails.username));
        });
        if(found) {
          this.showAlert('User Exists', 'The user already exists Please try again', ['OK']);
        } else {
          this.db.collection('users').add(this.userDetails);
          this.showAlert('Success', 'The user has been created', ['OK']);
          this.navCtrl.setRoot(LoginPage);
        }
      }
    } else {
      this.showAlert('Fill all Details', 'Please fill all the details in the form', ['OK']);
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
