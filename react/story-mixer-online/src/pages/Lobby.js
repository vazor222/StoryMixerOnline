import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
	}
];

function portraitReset(portraitImage, index) {
	portraitImage.src = portraits[index].idle;
}

export default class Lobby extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: {},
			error: null
		};
		this.handleStartGameSubmit = this.handleStartGameSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		//this.testAvatarImageLoaded = this.testAvatarImageLoaded.bind(this);
		//this.testAvatarImageLooped = this.testAvatarImageLooped.bind(this);
		this.portraitSelectionImageClicked = this.portraitSelectionImageClicked.bind(this);
	}
	
	componentDidMount() {
		// TODO: display randomly assigned avatar
		
		console.log("calling listenToRoom on lobby startup");
		console.log(this.props);
		console.log(this.props.roomCodeToJoin);
		console.log(this.handleRoomPlayersUpdated);
		listenToRoom(this.props.roomCodeToJoin, this.handleRoomPlayersUpdated);
	}
	
	//handleChange(event) {
	//	this.setState({
	//		[event.target.name]: event.target.value
	//	});
	//}
	
	handleCharacterChange(event) {
		// TODO: update borders
	}
	
	handleRoomPlayersUpdated(players) {
		console.log("handleRoomPlayersUpdated called");
		console.log(players);
		
		// put players in player display list (players by itself is a shortcut to "players: players")
		this.setState({ players });
	}
	
	handleStartGameSubmit(event) {
		event.preventDefault();
		this.setState({ error: '' });
		try {
			// TODO: this.setState({ redirect: "/trait" }); ?
		} catch (error) {
			this.setState({ error: error.message });
		}
	}
	
	handleCancel(event) {
		event.preventDefault();
		console.log("TODO: cancel/exit lobby/close lobby/delete room");
		
		this.props.history.replace("/");  // redirect to home
	}
	
	// bind and link this up in img tag onLoad event to run
	//testAvatarImageLoaded(e) {
	//	// fires whenever any animation is loaded (e.g. on click, and on revert to idle)
	//	console.log("test avatar loaded w:"+e.target.id);
	//	//setInterval(this.testAvatarImageLooped, 6700);
	//}
	
	//testAvatarImageLooped() {
	//	console.log("test avatar looped");
	//}

	portraitSelectionImageClicked(e, index) {
		console.log("portrait image clicked t:"+e.target.id+" index:"+index);
		// un-highlight all borders, and then highlight the clicked one
		for (let i = 0; i < portraits.length; ++i) {
			document.getElementById("avatar-container"+i).style.border = '5px solid black';
		}
		e.target.parentElement.style.border = "5px solid yellow";
		// update the player's portrait in firebase
		this.setState({
			chosen_character: index
		});
		try {
			console.log("portraitSelectionImageClicked calling updatePlayerInRoom joinPlayerName:"+this.state.joinPlayerName);
			updatePlayerInRoom(this.state.joinRoomCode, this.state.joinPlayerName, () => {
				console.log("Lobby player updated callback");
				console.log(this.props);
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
		// play the success animation
		e.target.src = portraits[index].success;
		setTimeout(portraitReset.bind(null, e.target, index), 2000);
	}

	render() {
		// TODO: move to style.css?
		const gymGuyAvatarStyle = {
			width:380,
			height:480,
			overflow:'hidden',
			border:'5px solid black'
		};
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
				<p>{this.props.roomCodeToJoin}</p>
				<div className="playerListContainer">
					{Object.entries(this.state.players).map(([key, value], index) => (
						<div className="lobbyBox" key={"playerdiv"+index+""+key}>
							<div className="lobbyNameBox">{key}</div><br />
							<img className="lobbyNameThumb" src={BlueHairIdleImage} alt={BlueHairIdleImage+index} />
						</div>
					))}
				</div>
				<hr />
				{/* show all the portraits and let the player click to select their avatar */}
				<div className="portraitSelectionContainer">
					{Object.entries(portraits).map(([key, value], index) => (
						<div id={"avatar-container"+index} style={gymGuyAvatarStyle}>
							<img onClick={(e) => this.portraitSelectionImageClicked(e, index)} id={"portrait"+index} style={imgStyle} src={value.idle} alt={value.idle+index}/><br />
						</div>
					))}
				</div>
				<hr />
				<div id="startGame">
					<form onSubmit={this.handleStartGameSubmit}>
						<b>Start Story Mixer!</b><br />
						(Press this when everyone has joined.)<br />
						<button id="start_game_button" type="submit">Start Game</button><br />
					</form>
				</div>
				<div id="cancel">
					<form onSubmit={this.handleCancel}>
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
}
