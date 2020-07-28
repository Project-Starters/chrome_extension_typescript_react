// import firebase from 'firebase';
import firebase from 'firebase/app';

// var firebase = require('firebase');

import 'firebase/auth';
import 'firebase/functions';

import config from "app/config";


export var app = firebase.initializeApp(config.firebaseConfig);

export var firebaseFunctions = app.functions();

app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
console.log("FIREBASE LOADED", firebase)
export const login = (email, password) => {
    app.auth().signInWithEmailAndPassword(email, password).then((event) => {
        console.log(event);
    }).catch((error) => {
        console.log(error);
    });
}

export default app;