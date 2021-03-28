import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const config = {
  apiKey: "AIzaSyBrrX96tIdgbkOwTQip-8__7yDGf92YD7o",
  authDomain: "hoteleseltambo-2e5e5.firebaseapp.com",
  databaseURL: "https://hoteleseltambo-2e5e5-default-rtdb.firebaseio.com",
  projectId: "hoteleseltambo-2e5e5",
  storageBucket: "hoteleseltambo-2e5e5.appspot.com",
  messagingSenderId: "507707426467",
  appId: "1:507707426467:web:a0ee6279b980eb1e01e116",
  measurementId: "G-PJG8XP5TTD"  
}

firebase.initializeApp(config)

export const db = firebase.database().ref()
export const auth = firebase.auth()
export const storage = firebase.storage()