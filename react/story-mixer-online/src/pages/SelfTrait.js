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

export default class SelfTrait extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playerSelfTrait: "",
			submitted: "",
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleSelfTraitInputTextChange = this.handleSelfTraitInputTextChange.bind(this);
		this.handleSelfTraitSubmit = this.handleSelfTraitSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on SelfTrait startup");
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
		
		// put players in player display list (players by itself is a shortcut to "players: players")
		this.setState({ players });
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleSelfTraitInputTextChange(event) {
		console.log("handleSelfTraitInputTextChange");
		console.log(event);
		this.setState({playerSelfTrait: event.target.value});
	}
	
	handleSelfTraitSubmit(event) {
		event.preventDefault();
		
		var selfTraitText = this.state.playerSelfTrait;
		console.log("selfTraitText:"+selfTraitText);
		
		// update the player's selftrait in firebase
		try {
			console.log("handleSelfTraitSubmit calling updatePlayerInRoom player:"+this.props.playerName+" this.props.roomCodeToJoin:"+this.props.roomCodeToJoin);
			var newPlayerData = {};
			newPlayerData.name = this.props.playerName;
			newPlayerData.portrait = this.props.playerPortraitIndex;
			newPlayerData.selftrait = selfTraitText;
			newPlayerData.othertrait = "";
			newPlayerData.obstacle = "";
			newPlayerData.story = "";
			newPlayerData.votes = 0;
			updatePlayerInRoom(this.props.roomCodeToJoin, newPlayerData, () => {
				console.log("SelfTrait player updated callback");
				// self trait changed, update app state
				this.props.onStateChange("selfTrait", selfTraitText);
				console.log(this.props);
				this.setState({ submitted: "Submitted!"});
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
		
		// TODO: play victory animation
	}
	
	handleNext(event) {
		event.preventDefault();
		
		this.props.history.replace("/othertrait");  // redirect to othertrait
	}

	render() {
		return (
			<div>
				<h2>Player</h2>
				<div className="traitBox">
					<div className="traitNameBox">{this.props.playerName}</div><br />
					<img className="traitNameThumb" src={portraits[this.props.playerPortraitIndex].idle} alt={portraits[this.props.playerPortraitIndex].idle} />
				</div>
				<hr />
				{/* allow the player to enter a trait for themselves */}
				<h2>Enter Trait</h2>
				<p>Enter a trait for your character. It can be a look, an attitude, a strength/weakness, skill, power, like/dislike, etc.</p>
				<div id="submitSelfTrait">
					<form onSubmit={this.handleSelfTraitSubmit}>
						<input type="text" onChange={this.handleSelfTraitInputTextChange} id="selfTraitInput" name="selfTraitInput" placeholder="Can fly" /><br />
						<button id="selfTraitSubmitButton" type="submit">Submit</button><br />
						{this.state.submitted}<br />
					</form>
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="next">
					<form onSubmit={this.handleNext}>
						<b>Do not</b> press this until everyone has finished writing and submitted their trait.<br />
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
