import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBc-Y-IT7q9WMATlUt6rvQLb7xUa_zkPOg",
  authDomain: "albumapp-ryley.firebaseapp.com",
  databaseURL: "https://albumapp-ryley.firebaseio.com",
  projectId: "albumapp-ryley",
  storageBucket: "albumapp-ryley.appspot.com",
  messagingSenderId: "1016256340304",
  appId: "1:1016256340304:web:0919746a6bab878dc50c55"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
