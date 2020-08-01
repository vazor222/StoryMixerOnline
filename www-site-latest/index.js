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
		String(Math.floor(Math.random()*1000)).padStart(3, '0');
}

// makes the room entry in the database
function createRoom()
{
	console.log("createRoom called");
	var newRoomCode = generateRoomCode();
	db.collection('rooms').doc(newRoomCode).set({
		code: newRoomCode,
		creator: creator_player_name.value,
		players: [creator_player_name.value]
	})
	.then(function() {
		console.log("Document written! id:"+newRoomCode);
	})
	.catch(function(error) {
		console.error("Error adding room! id:"+newRoomCode+" error:"+error);
	});
}

function joinRoomFromForm()
{
	joinRoomByCode(room.value);
}

function joinRoomByCode(roomCodeToJoin) {
	console.log("joinRoomByCode called");
	db.collection('rooms').doc(roomCodeToJoin).get().then(function(doc) {
		if( doc.exists ){
			var newPlayers = doc.data().players;
			newPlayers.push(player_name.value);
			doc.ref.update({'players':newPlayers}).then(function() {
				console.log("Document updated! id:"+roomCodeToJoin);
			})
			.catch(function(error) {
				console.error("Error joining room:"+roomCodeToJoin+" player_name:"+player_name+" error:"+error);
			});
		} else {
			console.log('No such document!');
		}
	});
}