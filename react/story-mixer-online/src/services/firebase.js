import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDBGHHYip5Lk2-f7BPSgH3xxlay1fhQR_w',
  authDomain: 'story-mixer-online.firebaseapp.com',
  projectId: 'story-mixer-online'
});

var db = firebase.firestore();