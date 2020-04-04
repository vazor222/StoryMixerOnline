// StoryMixerOnline main game module
// This work is copyrighted.


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
	console.log("stopListening called");
	document.getElementById('testavatar').src='b.png';
	setTimeout(setTestBack, 3000);
	// Stop listening to changes
	unsubscribe();
}
function setTestBack() {
  document.getElementById('testavatar').src='c.png';
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function getRandomRoomCodeGlyph()
{
	return alphabet.charAt(Math.floor(Math.random()*26));
}

function generateRoomCode()
{
	return getRandomRoomCodeGlyph()+
	getRandomRoomCodeGlyph()+
	Math.floor(Math.random()*1000);
}

// makes the room entry in the database
function createRoom()
{
	console.log("createRoom called");
	console.log(db);
	console.log(db.collection);
	console.log(getRandomRoomCodeGlyph());
	console.log(generateRoomCode());
	console.log(db.collection('rooms'));
	console.log(db.collection('rooms').add);
	db.collection('rooms').add({
		code: generateRoomCode(),
		creator: creator_player_name.value
	})
	.then(function(docRef) {
		console.log("Document written! id:"+docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding doc:"+error);
	});
}

function joinRoom()
{
	console.log("joinRoom called");
}