// StoryMixerOnline rooms module
// This work is copyrighted.

import { db } from "../services/firebase"

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

export function createRoom(creator_player_name, app, roomCreatedCallback)
{
	console.log("createRoom called! creator_player_name:"+creator_player_name);

	var newRoomCode = generateRoomCode();
	
	console.log("newRoomCode:"+newRoomCode);

	try
	{
		// makes the room entry in the database
		var roomPlayers = {};
		roomPlayers[creator_player_name] = {
					name: creator_player_name,
					portrait: 0,
					selftrait: ""};
		db.collection('rooms').doc(newRoomCode).set({
			code: newRoomCode,
			creator: creator_player_name,
			players: roomPlayers
		})
		.then(() => {
			console.log("Document written! id:"+newRoomCode);
			roomCreatedCallback(newRoomCode);
		})
		.catch((error) => {
			console.error("Error adding room! id:"+newRoomCode+" error:"+error);
		});
	}
	catch(err)
	{
		console.error(err);
	}
}

export function joinRoomFromForm(roomCodeToJoin, joinPlayerName, roomJoinedCallback)
{
	joinRoomFromFormAsync(roomCodeToJoin, joinPlayerName, roomJoinedCallback);
}

async function joinRoomFromFormAsync(roomCodeToJoin, joinPlayerName, roomJoinedCallback)
{
	console.log("joinRoomFromForm called! roomCodeToJoin:"+roomCodeToJoin);

	try
	{
		// update the room entry in the database to add ourselves to the player list
		var roomRef = db.collection('rooms').doc(roomCodeToJoin);
		console.log(roomRef);
		roomRef.get().then((room) => {
			if( room.exists )
			{
				console.log("Found room:"+roomCodeToJoin);
				console.log(room.data());
				var roomPlayers = room.data().players;
				console.log("roomPlayers before");
				console.log(roomPlayers);
				/*  TODO: enable this before release
				if( roomPlayers[joinPlayerName] !== undefined ) {
					console.error("player name "+joinPlayerName+" is taken!");
					window.alert("Player name "+joinPlayerName+" is taken! Please try again.");
					return;
				}*/
				roomPlayers[joinPlayerName] = {
					name: joinPlayerName,
					portrait: 0,
					selftrait: ""
				}
				console.log("roomPlayers after");
				console.log(roomPlayers);
				roomRef.update({players: roomPlayers}).then(() => {
					console.log("Room joined! roomCodeToJoin:"+roomCodeToJoin+" joinPlayerName:"+joinPlayerName);
					roomJoinedCallback();
				}).catch((updateError) => {
					console.log("Error joining room:"+roomCodeToJoin+" joinPlayerName:"+joinPlayerName);
				});
			}
			else
			{
				console.log("Room not found:"+roomCodeToJoin);
			}
		}).catch((error) => {
			console.log(error+" roomCode:"+roomCodeToJoin);
		});
	}
	catch(err)
	{
		console.error(err);
	}
}

export function listenToRoom(roomCode, roomPlayersUpdateCallback)
{
	console.log("listenToRoom called - roomCode:"+roomCode);
	try
	{
		var roomRef = db.collection('rooms').doc(roomCode);
		roomRef.get().then((room) => {
			if( room.exists )
			{
				console.log("Found listen room:"+room.data());
				roomRef.onSnapshot((snapshot) => {
					console.log("Got room update:"+snapshot.data());
					let players = snapshot.data().players;
					console.log("got players");
					console.log(players);
					roomPlayersUpdateCallback(players);
				});
			}
			else
			{
				console.log("Room listen not found(?!):"+roomCode);
			}
		}).catch((error) => {
			console.log(error+" listen roomCode:"+roomCode);
		});
	}
	catch(err)
	{
		console.error("ERROR: "+err);
	}
}
