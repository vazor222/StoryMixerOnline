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

export function createRoom(creator_player_name, app)
{
	console.log("createRoom called! creator_player_name:"+creator_player_name);

	var newRoomCode = generateRoomCode();

	try
	{
		db.collection('rooms').doc(newRoomCode).set({
			code: newRoomCode,
			creator: creator_player_name,
			players: [creator_player_name]
		})
		.then(() => {
			console.log("Document written! id:"+newRoomCode);
			console.log(app.state);
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

// makes the room entry in the database
