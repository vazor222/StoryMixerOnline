import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { listenToRoom } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuySuccess.png';
import BlueHairIdleImage from '../assets/blue_idle.png';

export default class Lobby extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: {},
			error: null
		};
		this.handleCharacterChange = this.handleCharacterChange.bind(this);
		this.handleStartGameSubmit = this.handleStartGameSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRoomPlayersUpdated = this.handleRoomPlayersUpdated.bind(this);
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
		this.setState({
			chosen_character: event.target.id
		});
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

	render() {
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
							<img className="lobbyNameThumb" src={BlueHairIdleImage} />
						</div>
					))}
				</div>
				<hr />
				{/* debug start test avatar */}
				<div id="avatar-container" style={gymGuyAvatarStyle}>
					<img id="testavatar" style={imgStyle} src={BlueHairIdleImage} alt="GymGuyTest"/><br />
				</div>
				{/* debug end test avatar */}
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
