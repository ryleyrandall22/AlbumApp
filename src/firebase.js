import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC7ts6lcSNKz6N5BhgHT1-EMHQPuTEzpDE",
  authDomain: "ryley-project.firebaseapp.com",
  databaseURL: "https://ryley-project.firebaseio.com",
  projectId: "ryley-project",
  storageBucket: "",
  messagingSenderId: "795497705569",
  appId: "1:795497705569:web:a06091297ab952b3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
