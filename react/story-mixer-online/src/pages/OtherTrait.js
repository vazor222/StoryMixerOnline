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

export default class OtherTrait extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: [],
			targetPlayerData: {},
			otherTrait: "",
			submitted: "",
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleOtherTraitInputTextChange = this.handleOtherTraitInputTextChange.bind(this);
		this.handleOtherTraitSubmit = this.handleOtherTraitSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on OtherTrait startup");
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
		
		// get target player (the player you will set their 'other' trait for)
		
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
		var targetPlayerIndex = myIndex+1;
		if( targetPlayerIndex >= players.length ) {
			targetPlayerIndex = 0;
		}
		console.log("targetPlayerIndex:"+targetPlayerIndex);
		console.log(players[targetPlayerIndex]);
		this.setState({players: players, targetPlayerData: players[targetPlayerIndex]});
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleOtherTraitInputTextChange(event) {
		console.log("handleOtherTraitInputTextChange");
		console.log(event);
		this.setState({otherTrait: event.target.value});
	}
	
	handleOtherTraitSubmit(event) {
		event.preventDefault();
		
		var otherTraitText = this.state.otherTrait;
		console.log("otherTraitText:"+otherTraitText);
		
		// update the player's othertrait in firebase
		try {
			console.log("handleOtherTraitSubmit calling updatePlayerInRoom player:"+this.props.playerName+" this.props.roomCodeToJoin:"+this.props.roomCodeToJoin);
			var targetPlayerData = this.state.targetPlayerData;
			console.log(targetPlayerData);
			targetPlayerData.othertrait = otherTraitText;
			console.log(targetPlayerData);
			updatePlayerInRoom(this.props.roomCodeToJoin, targetPlayerData, () => {
				console.log("OtherTrait player updated callback");
				console.log(this.props);
				console.log(targetPlayerData);
				this.setState(targetPlayerData);
				this.setState({ submitted: "Submitted!"});
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
		
		// TODO: play defeat animation?
	}
	
	handleNext(event) {
		event.preventDefault();
		
		this.props.history.replace("/obstacle");  // redirect to obstacle
	}

	render() {
		return (
			<div>
				<h2>Target Player</h2>
				<div className="traitBox">
					<div className="traitNameBox">{this.state.targetPlayerData.name}</div><br />
					<img className="traitNameThumb" src={this.state.targetPlayerData.portrait != undefined ? portraits[this.state.targetPlayerData.portrait].idle : undefined} alt={this.state.targetPlayerData.portrait != undefined ? portraits[this.state.targetPlayerData.portrait].idle : undefined} /><br />
					<p>Self Trait: {this.state.targetPlayerData.selftrait}</p>
				</div>
				<hr />
				{/* allow the player to enter a trait for another player */}
				<h2>Enter Trait</h2>
				<p>Now enter a trait for this other player's character. It can be a look, an attitude, a strength/weakness, skill, power, like/dislike, etc.</p>
				<div id="submitOtherTrait">
					<form onSubmit={this.handleOtherTraitSubmit}>
						<input type="text" onChange={this.handleOtherTraitInputTextChange} id="otherTraitInput" name="otherTraitInput" placeholder="Fears snakes" /><br />
						<button id="otherTraitSubmitButton" type="submit">Submit</button><br />
						{this.state.submitted}<br />
					</form>
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="next">
					<form onSubmit={this.handleNext}>
						<b>Do not</b> press this until everyone has finished writing their trait for the other player.<br />
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
