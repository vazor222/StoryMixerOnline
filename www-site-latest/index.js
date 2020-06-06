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

var unsubscribe = testRoom.onSnapshot(roomOnSnapshot);

function roomOnSnapshot(roomDoc)
{
	console.log("got update", roomDoc.data());
}

// use this when "exiting" a room
function stopListening() {
	console.log("stopListening called");
	document.getElementById('testavatar').src='VampFail.png';
	setTimeout(setTestBack, 1400);
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
		String(Math.floor(Math.random()*1000)).padStart(4, '0');
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
	var newRoomCode = generateRoomCode();
	db.collection('rooms').add({
		code: newRoomCode,
		creator: creator_player_name.value,
		players: [creator_player_name.value]
	})
	.then(function(docRef) {
		console.log("Document written! id:"+docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding doc:"+error);
	});
}

function joinRoomFromForm()
{
	console.log("joinRoomFromForm called");
	console.log("room", room.value);
	console.log("player_name", player_name.value);
	joinRoomByCode(room.value);
}

function joinRoomByCode(roomCodeToJoin) {
	console.log("joinRoomByCode called");
	console.log("roomCodeToJoin",roomCodeToJoin);
	db.collection('rooms').doc(roomCodeToJoin).get().then(function(doc) {
		if( doc.exists ){
			console.log('Document data:', doc.data());
			var newPlayers = doc.data().players;
			newPlayers.add(player_name.value);
			doc.update({players:newPlayers});
		} else {
			console.log('No such document!');
		}
	});
}