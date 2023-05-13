import React, { useEffect, useReducer } from 'react';
import { listenToRoom, updatePlayerInRoom } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuyIdleImage from '../assets/GymGuy_idle.png';
import GymGuyDefeatImage from '../assets/GymGuy_defeat.png';
import GymGuyVictoryImage from '../assets/GymGuy_victory.png';
import BlueHairIdleImage from '../assets/blue_idle.png';
import BlueHairDefeatImage from '../assets/blue_defeat.png';
import BlueHairVictoryImage from '../assets/blue_victory.png';
import FoxCopIdleImage from '../assets/fox_Idle.png';
import FoxCopDefeatImage from '../assets/fox_Defeat.png';
import FoxCopVictoryImage from '../assets/fox_Victory.png';
import DragonIdleImage from '../assets/Dragon-Idle.gif';
import DragonDefeatImage from '../assets/Dragon-Defeat.gif';
import DragonVictoryImage from '../assets/Dragon-Victory.gif';
import NinjaIdleImage from '../assets/Ninja-idle.png';
import NinjaDefeatImage from '../assets/Ninja-defeat.png';
import NinjaVictoryImage from '../assets/Ninja-victory.png';
import PigletIdleImage from '../assets/Piglet_Idle.png';
import PigletDefeatImage from '../assets/Piglet_Defeat.png';
import PigletVictoryImage from '../assets/Piglet_Victory.png';
import VampIdleImage from '../assets/vamp_Idle.png';
import VampDefeatImage from '../assets/vamp_Defeat.png';
import VampVictoryImage from '../assets/vamp_Victory.png';
import RobotIdleImage from '../assets/robot_Idle.png';
import RobotDefeatImage from '../assets/robot_Defeat.png';
import RobotVictoryImage from '../assets/robot_Victory.png';
import { useAppCtx } from '../store';
import { useNavigate } from 'react-router-dom';


// this also determines the portraitIndex stored in firebase?
const portraits = [
	{
		idle: BlueHairIdleImage,
		success: BlueHairVictoryImage,
		failure: BlueHairDefeatImage
	},
	{
		idle: GymGuyIdleImage,
		success: GymGuyVictoryImage,
		failure: GymGuyDefeatImage
	},
	{
		idle: FoxCopIdleImage,
		success: FoxCopVictoryImage,
		failure: FoxCopDefeatImage
	},
	{
		idle: DragonIdleImage,
		success: DragonVictoryImage,
		failure: DragonDefeatImage
	},
	{
    idle: NinjaIdleImage,
    success: NinjaVictoryImage,
    failure: NinjaDefeatImage
  },
	{
    idle: PigletIdleImage,
    success: PigletVictoryImage,
    failure: PigletDefeatImage
  },
	{
    idle: VampIdleImage,
    success: VampVictoryImage,
    failure: VampDefeatImage
  },
	{
    idle: RobotIdleImage,
    success: RobotVictoryImage,
    failure: RobotDefeatImage
  }
];

function portraitReset(portraitImage, index) {
	portraitImage.src = portraits[index].idle;
}

export default function Lobby() {
	const navigate = useNavigate();
	const { roomCode, playerName } = useAppCtx();
	const [{chosenCharacter, players, error}, dispatch] = useReducer((state, action) => {
		switch(action.type){
			case 'setChosenCharacter': return {...state, chosenCharacter: action.payload};
			case 'setError': return {...state, error: action.payload};
			case 'setPlayers': return {...state, players: action.payload};
			default: return;
		}
	},
	{
		chosenCharacter: null,
		error: '',
		players: [{
			name: playerName
		}]
	})
	
	// TODO: display randomly assigned avatar
	useEffect(() => {
		listenToRoom( roomCode, handleRoomPlayersUpdated );
	}, [roomCode])
	
	//handleChange(event) {
	//	setState({
	//		[event.target.name]: event.target.value
	//	});
	//}
	
	// handleCharacterChange(e) {
	// 	// TODO: update borders
	// }
	
	function handleRoomPlayersUpdated(p) {
		const newPlayers = {...p}
		console.log("handleRoomPlayersUpdated called");
		console.log(newPlayers);
		
		// put players in player display list (players by itself is a shortcut to "players: players")
		dispatch({
			type: 'setPlayers',
			payload: newPlayers
		});
	}
	
	function handleStartGameSubmit(event) {
		event.preventDefault();
		dispatch({
			type: 'setError',
			payload: ''
		});
		try {
			// TODO: setState({ redirect: "/trait" }); ?
		} catch (error) {
			dispatch({
				type: 'setError',
				payload: error.message
			});
		}
	}
	
	function handleCancel(event) {
		event.preventDefault();
		console.log("TODO: cancel/exit lobby/close lobby/delete room");
		navigate("/");  // redirect to home
	}
	
	// bind and link this up in img tag onLoad event to run
	//testAvatarImageLoaded(e) {
	//	// fires whenever any animation is loaded (e.g. on click, and on revert to idle)
	//	console.log("test avatar loaded w:"+e.target.id);
	//	//setInterval(testAvatarImageLooped, 6700);
	//}
	
	//testAvatarImageLooped() {
	//	console.log("test avatar looped");
	//}

	function portraitSelectionImageClicked(e, index) {
		console.log("portrait image clicked t:"+e.target.id+" index:"+index);
		// un-highlight all borders, and then highlight the clicked one
		for (let i = 0; i < portraits.length; ++i) {
			document.getElementById("avatar-container"+i).style.border = '5px solid black';
		}
		e.target.parentElement.style.border = "5px solid yellow";
		// update the player's portrait in firebase
		dispatch({
			type: 'setChosenCharacter',
			payload: index
		});
		try {
			console.log("portraitSelectionImageClicked calling updatePlayerInRoom playerName:"+playerName);
			updatePlayerInRoom( roomCode, playerName, () => {
				console.log("Lobby player updated callback");
			});
		} catch (error) {
			dispatch({
				type: 'setError',
				payload: error.message
			});
		}
		// play the success animation
		e.target.src = portraits[index].success;
		setTimeout(portraitReset.bind(null, e.target, index), 2000);
	}
		// TODO: move to style.css?
	const gymGuyImgStyle = {
		marginTop:-10,
		marginRight:0,
		marginBottom:0,
		marginLeft:-350
	};
	const imgStyle = {
		marginTop:0,
		marginRight:0,
		marginBottom:0,
		marginLeft:0
	};
	return (
		<div>
			<p>Troupe Code</p>
			<p>{roomCode}</p>
			<div className="playerListContainer">
				{Object.entries(players).map((player, index) => (
					<div className="lobbyBox" key={"playerdiv"+index+""+player.name}>
						<div className="lobbyNameBox">{player.name}</div><br />
						<img className="lobbyNameThumb" src={BlueHairIdleImage} alt={BlueHairIdleImage+index} />
					</div>
				))}
			</div>
			<hr />
			{/* show all the portraits and let the player click to select their avatar */}
			<div className="portraitSelectionContainer">
				{Object.entries(portraits).map(([key, value], index) => (
					<div id={"avatar-container"+index} className="lobbyAvatarStyle">
						<img onClick={(e) => portraitSelectionImageClicked(e, index)} id={"portrait"+index} style={imgStyle} src={value.idle} alt={value.idle+index}/>
					</div>
				))}
			</div>
			<hr />
			<div id="startGame">
				<form onSubmit={handleStartGameSubmit}>
					<b>Start Story Mixer!</b><br />
					(Press this when everyone has joined.)<br />
					<button id="start_game_button" type="submit">Start Game</button><br />
				</form>
			</div>
			<div id="cancel">
				<form onSubmit={handleCancel}>
					<b>Cancel and exit lobby.</b><br />
					<button id="cancel_button" type="submit">Cancel</button><br />
				</form>
			</div>
			<hr />
			By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
			<br />
		</div>
	)
}
