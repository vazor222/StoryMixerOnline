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
		db.collection('rooms').doc(newRoomCode).set({
			code: newRoomCode,
			creator: creator_player_name,
			players: [creator_player_name]
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

export async function joinRoomFromForm(roomCodeToJoin, joinPlayerName, roomJoinedCallback)
{
	console.log("joinRoomFromForm called! roomCodeToJoin:"+roomCodeToJoin);

	try
	{
		// update the room entry in the database to add ourselves to the player list
		await db.ref('rooms/'+roomCodeToJoin+'/players').push(joinPlayerName);
		roomJoinedCallback();
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
		db.ref("rooms/"+roomCode+"/players").on("value", snapshot => {
			let players = [];
			snapshot.forEach((snap) => {
				players.push(snap.val());
			});
			console.log("got players");
			console.log(players);
			roomPlayersUpdateCallback(players);
		});
	}
	catch(error)
	{
		console.error("ERROR: "+error);
	}
}
