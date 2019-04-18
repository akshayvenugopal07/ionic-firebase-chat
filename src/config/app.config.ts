export class AppConfig {

    public static EMAIL_VALIDATION_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public static NUMBER_VALIDATION_REGEX = /^[0-9]+$/;
    public static URL_VALIDATION_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    public static LOCATION_ENDPOINT = 'https://maps.googleapis.com/maps/api';

    public static API_ENDPOINT = 'https://api.github.com';

    public static FIREBASE = {
        apiKey: "AIzaSyDrHzO_zqKwc9KEC2RysEhbdD_kMjcOx40",
        authDomain: "ionic-starter-chat-4d556.firebaseapp.com",
        databaseURL: "https://ionic-starter-chat-4d556.firebaseio.com",
        projectId: "ionic-starter-chat-4d556",
        storageBucket: "ionic-starter-chat-4d556.appspot.com",
        messagingSenderId: "737703303013"
    };

}