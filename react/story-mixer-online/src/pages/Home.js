import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createRoom } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuySuccess.png';
import BlueHairIdleImage from '../assets/blue_idle.png';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			creator_player_name: '',
			roomCodeToJoin: '',
		};
		this.handleCreatorPlayerNameChange = this.handleCreatorPlayerNameChange.bind(this);
		this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
	}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	
	handleCreatorPlayerNameChange(event) {
		this.setState({
			creator_player_name: event.target.value
		});
	}
	
	handleCreateSubmit(event) {
		event.preventDefault();
		this.setState({ error: '' });
		try {
			createRoom(this.state.creator_player_name, this);
			this.props.onRouteChange("/lobby");  // redirect to lobby
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
				<div id="join">
					<b>Join an existing game?</b><br />
					Game Room Code:<br />
					<input id="room_code" /><br />
					Player Name:<br />
					<input id="player_name" /><br />
					<button id="join_button" onClick="joinRoomFromForm();">Join</button><br />
				</div>
				<hr />
				<div id="create">
					<form onSubmit={this.handleCreateSubmit}>
						<b>Create a game?</b><br />
						Creator Player Name:<br />
						<input onChange={this.handleCreatorPlayerNameChange} id="creator_player_name" value={this.state.creator_player_name} /><br />
						<button type="submit" id="create_button">Create</button><br />
					</form>
				</div>
				<hr />
				<div id="test">
					# Debug Test #<br />
					stop listening?<br />
					<button id="stop_listening_button" onClick="stopListening();">Stop Listening</button><br />
				</div>
				<hr />
				<div align="right" style={{fontSize:"72px"}}>
					<Link to="/info">Info</Link> {/*make this a circled "i" info button*/}
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
