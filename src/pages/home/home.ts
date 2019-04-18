import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private itemDoc: AngularFirestoreDocument;

  chats: any;
  chatList: any;

  loggedInUser = {
    email: '',
    username: '',
  };

  message: any;

  answer: any;

  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public platform: Platform,
    public ngZone: NgZone,
    private alertCtrl: AlertController,
    public navParams: NavParams) {

    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "48b4ac22e04442a18f9002f625897ee8"
      }).then(result => console.log(result));
    });

    this.chats = db.collection('chats', ref => ref.orderBy('time')).snapshotChanges();

    if ((this.navParams.data.data.email) || (this.navParams.data.data.username)) {
      this.loggedInUser.email = this.navParams.data.data.email;
      this.loggedInUser.username = this.navParams.data.data.username;
    } else {
      this.navCtrl.setRoot(LoginPage);
    }

    this.chats.subscribe((resp) => {
      this.chatList = resp.map((item) => {
        let obj = {
          data: item.payload.doc.data(),
          id: item.payload.doc.id
        };
        return obj;
      });
      this.chatList.sort((a, b) => {
        return a.data.time.seconds - b.data.time.seconds;
      });
    })
  }

  sendMessage() {
    let data = {
      chat: this.message,
      email: this.loggedInUser.email,
      username: this.loggedInUser.username,
      time: new Date().getTime()
    };
    this.addToFirebase(data);
  }

  askAI() {
    if (this.message) {
      let data = {
        chat: this.message,
        email: this.loggedInUser.email,
        username: this.loggedInUser.username,
        time: new Date().getTime()
      };
      this.db.collection('chats').add(data);
      if (this.message) {
        ApiAIPromises.requestText({
          query: this.message
        }).then(({ result: { fulfillment: { speech } } }) => {
          this.ngZone.run(() => {
            this.answer = speech;
            let data = {
              chat: this.answer,
              email: "ai@google.com",
              username: "Agent Pharoah",
              time: new Date().getTime()
            };
            this.addToFirebase(data);
          });
        });
      }
    }
  }

  addToFirebase(data) {
    this.db.collection('chats').add(data);
    this.message = '';
  }

}

