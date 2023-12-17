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

export default class Story extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playerStory: "",
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleStoryInputTextChange = this.handleStoryInputTextChange.bind(this);
		this.handleStorySubmit = this.handleStorySubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on Story startup");
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
		console.log(players[this.props.playerName]);
		this.setState({ players: players, playerData: players[this.props.playerName] });
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleStoryInputTextChange(event) {
		console.log("handleStoryInputTextChange");
		console.log(event);
		this.setState({playerStory: event.target.value});
	}
	
	handleStorySubmit(event) {
		event.preventDefault();
		
		var storyText = this.state.playerStory;
		console.log("storyText:"+storyText);
		
		// update the player's story in firebase
		try {
			console.log("handleStorySubmit calling updatePlayerInRoom player:"+this.props.playerName+" this.props.roomCodeToJoin:"+this.props.roomCodeToJoin);
			var newPlayerData = this.state.playerData;
			newPlayerData.story = storyText;
			updatePlayerInRoom(this.props.roomCodeToJoin, newPlayerData, () => {
				console.log("Story player updated callback");
				// story changed, update app state
				this.props.onStateChange("story", storyText);
				console.log(this.props);
				// TODO: show "Submitted!" next to button or something
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
	}
	
	handleNext(event) {
		event.preventDefault();
		
		this.props.history.replace("/vote");  // redirect to voting scene
	}

	render() {
		return (
			<div>
				<h2>Player</h2>
				<div className="storyBox">
					<div className="storyNameBox">{this.props.playerName}</div><br />
					<img className="storyThumb" src={portraits[this.props.playerPortraitIndex].idle} alt={portraits[this.props.playerPortraitIndex].idle} />
					<p>Self Trait: {this.props.selfTrait}</p>
					<p>Other Trait: {this.state.playerData != undefined? this.state.playerData.otherTrait : undefined}</p>
					<p>Obstacle: {this.state.playerData != undefined? this.state.playerData.obstacle : undefined}</p>
				</div>
				<hr />
				{/* the player writes a story */}
				<h2>Enter Story</h2>
				<p>You have a character with traits and an event to face. Enter a story telling us what your character does.</p>
				<div id="submitStory">
					<form onSubmit={this.handleStorySubmit}>
						<input type="text" onChange={this.handleStoryInputTextChange} id="storyInput" name="storyInput" placeholder="I use my trait..." /><br />
						<button id="storySubmitButton" type="submit">Submit</button><br />
					</form>
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="next">
					<form onSubmit={this.handleNext}>
						<b>Do not</b> press this until everyone has finished writing and submitted their story.<br />
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
