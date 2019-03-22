import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const config = {
  apiKey: "AIzaSyD6mPQ2Cz4_0odcWywwWpRlNNNT0bH3U2U",
  authDomain: "tambohotels.firebaseapp.com",
  databaseURL: "https://tambohotels.firebaseio.com",
  projectId: "tambohotels",
  storageBucket: "tambohotels.appspot.com",
  messagingSenderId: "49001846554"
}

firebase.initializeApp(config)

export const db = firebase.database().ref()
export const auth = firebase.auth()
export const storage = firebase.storage()