import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createRoom, joinRoomFromForm } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuy_victory.png';
import BlueHairIdleImage from '../assets/blue_idle.png';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			joinRoomCode: '',
			joinPlayerName: '',
			error: null
		};
		this.handleJoinRoomCodeChange = this.handleJoinRoomCodeChange.bind(this);
		this.handleCreatorPlayerNameChange = this.handleCreatorPlayerNameChange.bind(this);
		this.handleJoinPlayerNameChange = this.handleJoinPlayerNameChange.bind(this);
		this.handleJoinClick = this.handleJoinClick.bind(this);
		this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
	}
	
	handleJoinRoomCodeChange(event) {
		console.log("handleJoinRoomCodeChange");
		console.log(event);
		this.setState({joinRoomCode: event.target.value});
	}
	
	handleJoinPlayerNameChange(event) {
		console.log("handleJoinPlayerNameChange");
		console.log(event);
		this.setState({joinPlayerName: event.target.value});
	}
	
	handleCreatorPlayerNameChange(event) {
		this.props.onStateChange("creatorPlayerName", event.target.value);
	}
	
	handleJoinClick(event) {
		event.preventDefault();
		// TODO: remove these debug default value setters for final release
		if( this.state.joinRoomCode.length === 0 )
		{
			this.state.joinRoomCode = "BG263";
			this.state.joinPlayerName = "joiner8136";
		}
		if( this.state.joinRoomCode.length !== 5 )
		{
			console.error('Invalid room code!');
			console.log(this.state);
			console.log(this.state.joinRoomCode);
			console.log(this.state.error);
			alert('Invalid room code!');
			this.setState({ error: 'Invalid room code!' });
			console.log(this.state.error);
			return;
		}
		this.setState({ error: '' });
		try {
			console.log("handleJoinClick calling joinRoomFromForm room joinPlayerName:"+this.state.joinPlayerName);
			joinRoomFromForm(this.state.joinRoomCode, this.state.joinPlayerName, (creatorPlayerName) => {
				this.props.onStateChange("roomCodeToJoin", this.state.joinRoomCode);
				this.props.onStateChange("playerName", this.state.joinPlayerName);
				this.props.onStateChange("creatorPlayerName", creatorPlayerName);
				console.log("Home room joined callback");
				console.log(this.props);
				this.props.history.replace("/lobby");  // redirect to lobby
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
	}
	
	handleCreateSubmit(event) {
		event.preventDefault();
		this.setState({ error: '' });
		try {
			console.log("handleCreateSubmit calling createRoom room creatorPlayerName:"+this.props.creatorPlayerName);
			createRoom(this.props.creatorPlayerName, this, (newRoomCode) => {
				this.props.onStateChange("roomCodeToJoin", newRoomCode);
				this.props.onStateChange("playerName", this.props.creatorPlayerName);
				this.props.onStateChange("creatorPlayerName", this.props.creatorPlayerName);
				console.log("Home room created callback");
				console.log(this.props);
				this.props.history.replace("/lobby");  // redirect to lobby
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
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
				<p>Welcome to Story Mixer Online! A cooperative storytelling game for people who like to come up with ideas and combine them with others.</p>
				<img src={FairyMascotSplashImage} alt="Fairy Mascot" style={{width:"100%"}} /><br />
				<hr />
				{/* debug start test avatar */}
				<div id="avatar-container" style={gymGuyAvatarStyle}>
					<img id="testavatar" style={imgStyle} src={BlueHairIdleImage} alt="GymGuyTest"/><br />
				</div>
				{/* debug end test avatar */}
				<div id="error">
					{this.state.error ? <p>{this.state.error}</p> : null}
				</div>
				<div id="join">
					<b>Join an existing game?</b><br />
					Game Room Code:<br />
					<input onChange={this.handleJoinRoomCodeChange} id="room_code" /><br />
					Player Name:<br />
					<input onChange={this.handleJoinPlayerNameChange} id="player_name" /><br />
					<button id="join_button" onClick={this.handleJoinClick}>Join</button><br />
				</div>
				<hr />
				<div id="create">
					<form onSubmit={this.handleCreateSubmit}>
						<b>Create a game?</b><br />
						Creator Player Name:<br />
						<input onChange={this.handleCreatorPlayerNameChange} id="creator_player_name" /><br />
						<button type="submit" id="create_button">Create</button><br />
					</form>
				</div>
				<hr />
				<div align="right" style={{fontSize:"72px"}}>
					<Link to="/info">Info</Link> {/*make this a circled "?" info button*/}
				</div>
				By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
				<br />
				<script src="index.js"></script>
				<script>
					console.log("main index.html finished loading");
				</script>
				<form onSubmit={this.handleSubmit}>
					<h1>
						Sign Up to <Link to="/">Chatty</Link>
					</h1>
					<p>Fill in the form below to create an account.</p>
					<div>
						<input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state?.email}></input>
					</div>
					<div>
						<input placeholder="Password" name="password" onChange={this.handleChange} value={this.state?.password} type="password"></input>
					</div>
					<div>
						{this.state?.error ? <p>{this.state?.error}</p> : null}
						<button type="submit">Sign up</button>
					</div>
					<hr></hr>
					<p>Already have an account? <Link to="/login">Login</Link></p>
				</form>
			</div>
		)
	}
}
