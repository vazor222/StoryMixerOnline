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


// this also determines the portraitIndex stored in firebase
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

export default class Obstacle extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: [],
			targetPlayerData: {},
			obstacle: "",
			submitted: "",
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleObstacleInputTextChange = this.handleObstacleInputTextChange.bind(this);
		this.handleObstacleSubmit = this.handleObstacleSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on Obstacle startup");
		console.log(this.props);
		console.log(this.props.roomCodeToJoin);
		console.log(this.props.playerName);
		console.log(this.props.playerPortraitIndex);
		listenToRoom(this.props.roomCodeToJoin, this.handleRoomPlayersUpdated, this.setRoomUnsubscribeFunc);
	}
	
	componentWillUnmount() {
		console.log(this.roomUnsubscribeFunc);
		this.roomUnsubscribeFunc();  // stop listening for room changes
	}
	
	//handleChange(event) {
	//	this.setState({
	//		[event.target.name]: event.target.value
	//	});
	//}
	
	handleRoomPlayersUpdated(players) {
		console.log("handleRoomPlayersUpdated called");
		console.log(players);
		
		// get target player (the player you will set their obstacle for)
		
		let myIndex = -1;
		for (let i = 0; i < players.length; ++i) {
			if( players[i].name === this.props.playerName) {
				myIndex = i;
				break;
			}
		}
		if( myIndex < 0 ) {
			console.error("player "+this.props.playerName+" not found!");
			window.alert("Server error: no longer in room, please restart the game (by having everyone browse back to the beginning and refresh) and try again.");
			return;
		}
		console.log("myIndex:"+myIndex);
		var targetPlayerIndex = myIndex-1;
		if( targetPlayerIndex < 0 ) {
			targetPlayerIndex = players.length-1;
		}
		console.log("targetPlayerIndex:"+targetPlayerIndex);
		console.log(players[targetPlayerIndex]);
		this.setState({players: players, targetPlayerData: players[targetPlayerIndex]});
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleObstacleInputTextChange(event) {
		this.setState({obstacle: event.target.value});
	}
	
	handleObstacleSubmit(event) {
		event.preventDefault();
		
		var obstacleText = this.state.obstacle;
		console.log("obstacleText:"+obstacleText);
		
		// update the player's obstacle in firebase
		try {
			console.log("handleObstacleSubmit calling updatePlayerInRoom player:"+this.props.playerName+" this.props.roomCodeToJoin:"+this.props.roomCodeToJoin);
			var targetPlayerData = this.state.targetPlayerData;
			console.log(targetPlayerData);
			targetPlayerData.obstacle = obstacleText;
			console.log(targetPlayerData);
			updatePlayerInRoom(this.props.roomCodeToJoin, targetPlayerData, () => {
				console.log("Obstacle player updated callback");
				console.log(this.props);
				console.log(targetPlayerData);
				this.setState(targetPlayerData);
				this.setState({ submitted: "Submitted!"});
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
		
		// TODO: play success animation
	}
	
	handleNext(event) {
		event.preventDefault();
		
		this.props.history.replace("/story");  // redirect to story
	}

	render() {
		return (
			<div>
				<h2>Target Player</h2>
				<div className="obstacleBox">
					<div className="traitNameBox">{this.state.targetPlayerData.name}</div><br />
					<img className="obstacleThumb" src={this.state.targetPlayerData.portrait != undefined ? portraits[this.state.targetPlayerData.portrait].idle : undefined} alt={this.state.targetPlayerData.portrait != undefined ? portraits[this.state.targetPlayerData.portrait].idle : undefined} /><br />
					<p>Self Trait: {this.state.targetPlayerData.selftrait}</p>
					<p>Other Trait: {this.state.targetPlayerData.othertrait}</p>
				</div>
				<hr />
				{/* allow the player to enter an obstacle for another player */}
				<h2>Enter Obstacle</h2>
				<p>Now enter an obstacle for this other player's character. It can be an event, roadblock, enemy, challenge, goal, scene, etc. that they have to face.</p>
				<div id="submitObstacle">
					<form onSubmit={this.handleObstacleSubmit}>
						<input type="text" onChange={this.handleObstacleInputTextChange} id="obstacleInput" name="obstacleInput" placeholder="You meet a stranger" /><br />
						<button id="obstacleSubmitButton" type="submit">Submit</button><br />
						{this.state.submitted}<br />
					</form>
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="next">
					<form onSubmit={this.handleNext}>
						<b>Do not</b> press this until everyone has finished writing the obstacle for the other player and submitted it.<br />
						<button id="nextButton" type="submit">Next</button><br />
					</form>
				</div>
				<hr />
				By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
				<br />
			</div>
		)
	}
}
