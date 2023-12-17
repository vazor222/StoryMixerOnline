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

export default class End extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: {},
			winners: [],
			error: null
		};
		this.roomUnsubscribeFunc = null;
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
		this.setRoomUnsubscribeFunc = this.setRoomUnsubscribeFunc.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
	}

	componentDidMount() {
		console.log("calling listenToRoom on End startup");
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
		var highestScore = 0;
		var winners = [];
		for( var pk in players ) {
			var player = players[pk];
			if( player.votes > highestScore ) {
				highestScore = player.votes;
			}
		}
		for( var pk in players ) {
			var player = players[pk];
			if( player.votes == highestScore ) {
				winners.push(pk);
			}
		}
		console.log("highestScore:"+highestScore);
		console.log("winners:");
		console.log(winners);
		this.setState({ players: players, winners: winners });
	}
	
	setRoomUnsubscribeFunc(roomUnsubscribeFunc) {
		this.roomUnsubscribeFunc = roomUnsubscribeFunc;
	}
	
	handleNewGame(event) {
		event.preventDefault();
		
		this.props.history.replace("/");
	}

	render() {
		return (
			<div>
				{/* show all the portraits and vote count and play victory for winners and defeat for others */}
				<h2>The End</h2>
				<p>Congratulations to our winners!</p><br />
				<div className="endContainer">
					{Object.entries(this.state.players).map(([key, value], index) => (
						<div id={"end"+index} key={"end-"+index+"-"+key} className="endDiv">
							<p>Name: {value.name}</p>
							<img src={this.state.winners.includes(value.name)? portraits[value.portrait].success : portraits[value.portrait].failure} alt={(this.state.winners.includes(value.name)? portraits[value.portrait].success : portraits[value.portrait].failure)+""+index} /><br />
							<p>Votes: {value.votes}</p>
							<hr />
						</div>
					))}
				</div>
				<h2>Credits</h2>
				<div id="credits">
					<p>J Peter Jones - Art, Animation</p>
					<p>vazor - Design, Code</p><br />
				</div>
				<hr />
				<h2>Next Step</h2>
				<div id="newGame">
					<form onSubmit={this.handleNewGame}>
						<button id="newGameButton" type="submit">New Game</button><br />
					</form>
				</div>
				<hr />
				By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
				<br />
			</div>
		)
	}
}
