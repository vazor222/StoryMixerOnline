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

export default class Vote extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: [],
			submitted: "",
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on Vote startup");
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
		
		this.setState({ players });
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleVoteSubmit(event) {
		event.preventDefault();
		
		// find the player that was voted
		var votePlayerName = event.target.firstChild.name;
		console.log("votePlayerName:"+votePlayerName);
		
		// update the vote count in firebase
		try {
			console.log("handleVoteSubmit calling updatePlayerInRoom player:"+this.props.playerName+" this.props.roomCodeToJoin:"+this.props.roomCodeToJoin);
			// get target player (the player you are voting for)
			let votePlayerIndex = -1;
			for (let i = 0; i < this.state.players.length; ++i) {
				if( this.state.players[i].name === votePlayerName ) {
					votePlayerIndex = i;
					break;
				}
			}
			if( votePlayerIndex < 0 ) {
				console.error("player "+votePlayerName+" not found!");
				window.alert("Server error: could not find player in room, please restart the game (by having everyone browse back to the beginning and refresh) and try again.");
				return;
			}
			var targetPlayerData = this.state.players[votePlayerIndex];
			console.log(targetPlayerData);
			targetPlayerData.votes++;
			console.log(targetPlayerData);
			updatePlayerInRoom(this.props.roomCodeToJoin, targetPlayerData, () => {
				console.log("Vote player updated callback");
				this.setState({ submitted: "Vote submitted!"});
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
	}
	
	handleNext(event) {
		event.preventDefault();
		
		this.props.history.replace("/end");
	}

	render() {
		return (
			<div>
				{/* show all the portraits and let the player click to select their avatar */}
				<h2>Vote</h2>
				<p>Vote for your favorites or for each one that entertained you.</p><br />
				<div className="voteSelectionContainer">
					{this.state.players.map((player, index) => (
						<div id={"story"+index} key={"story-"+index+"-"+player.name} className="storyDiv">
							<p>Name: {player.name}</p>
							<img src={portraits[player.portrait].idle} alt={portraits[player.portrait].idle+index} /><br />
							<p>Self Trait: {player.selftrait}</p>
							<p>Other Trait: {player.othertrait}</p>
							<p>Obstacle: {player.obstacle}</p>
							<p>Story: {player.story}</p>
							<form onSubmit={this.handleVoteSubmit}>
								<button id={index+"VoteButton"} name={player.name} type="submit">Vote</button><br />
								{this.state.submitted}<br />
							</form>
							<hr />
						</div>
					))}
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="next">
					<form onSubmit={this.handleNext}>
						<b>Do not</b> press this until everyone has finished submitting their votes.<br />
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
