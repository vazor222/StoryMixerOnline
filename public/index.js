console.log(firebase);

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDBGHHYip5Lk2-f7BPSgH3xxlay1fhQR_w',
  authDomain: 'story-mixer-online.firebaseapp.com',
  projectId: 'story-mixer-online'
});

var db = firebase.firestore();

// list all
db.collection("rooms").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
    });
});

// get specific doc
var testRoom = db.collection("rooms").doc("HV458");
testRoom.get().then(function(doc) {
	if(doc.exists) {
		console.log("got testRoom doc:", doc.data());
		var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
		console.log(source, "data:", doc.data());
	}	else {
		console.log("could not get testRoom doc!");
	}
});

var unsubscribe = testRoom
	.onSnapshot(function (doc) {
		console.log("got update", doc.data());
	});

// use this when "exiting" a room
function stopListening() {
	// Stop listening to changes
	unsubscribe();
}
