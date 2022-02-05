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
			players: [],
			error: null
		};
		this.handleCharacterChange = this.handleCharacterChange.bind(this);
		this.handleStartGameSubmit = this.handleStartGameSubmit.bind(this);
		
		// TODO: display randomly assigned avatar
		
		console.log("calling listenToRoom on lobby startup");
		console.log(props);
		console.log(props.roomCodeToJoin);
		console.log(this.handleRoomPlayersUpdated);
		listenToRoom(props.roomCodeToJoin, this.handleRoomPlayersUpdated);
	}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	
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
				<p>Waiting for other players...</p>
				<p>To play: Go to [this host] and use this Game Room Code:<br />
				{this.props.roomCodeToJoin}<br />
				and then fill in your Player Name, and then click Join!</p>
				Players joined so far:<br />
				{this.props.creatorPlayerName} (Room Owner)<br /> {/* TODO: display list of users and if == creatorPlayerName then say Room Owner */}
				<div className="players">
					{this.state.players.map(player => {
						return <p>{player}</p>
						//if(player == creatorPlayerName)
						//	return {player} (Room Creator)<br />
						//else
						//	return {player}<br />
						//return <p key={player.timestamp}>{player.content}</p>
					})}
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
				<div align="right" style={{fontSize:"72px"}}>
					<Link to="/info">Info</Link> {/* TODO: make this a circled "i" info button*/}
				</div>
				By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
				<br />
			</div>
		)
	}
}
