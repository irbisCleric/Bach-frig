// import * as firebaseDom from 'firebase-nodejs';

const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyA5_f4QPSvk8B2893CEbxvcszRroADH0bc",
    authDomain: "bach-frig.firebaseapp.com",
    databaseURL: "https://bach-frig.firebaseio.com",
    storageBucket: "bach-frig.appspot.com",
    messagingSenderId: "102781650181",
};

firebase.initializeApp(config);

module.exports = firebase;
