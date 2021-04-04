import firebase from 'firebase';
import "firebase/firestore";

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDBGHHYip5Lk2-f7BPSgH3xxlay1fhQR_w",
    authDomain: "story-mixer-online.firebaseapp.com",
    databaseURL: "https://story-mixer-online.firebaseio.com",
    projectId: "story-mixer-online",
    storageBucket: "story-mixer-online.appspot.com",
    messagingSenderId: "324326967821",
    appId: "1:324326967821:web:b3799d68de5e2a5c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/

firebase.initializeApp({
  apiKey: 'AIzaSyDBGHHYip5Lk2-f7BPSgH3xxlay1fhQR_w',
  authDomain: 'story-mixer-online.firebaseapp.com',
  projectId: 'story-mixer-online'
});

export const db = firebase.firestore();

/*
// list all
db.collection("rooms").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
				console.log(doc.data());
		});
});
*/
