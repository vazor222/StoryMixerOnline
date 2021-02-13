import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuySuccess.png';

export default class Home extends Component {
	render() {
		const gymGuyAvatarStyle = {
			width:380,
			height:500,
			overflow:'hidden',
			border:'5px solid black'
		};
		const imgStyle = {
			marginTop:-10,
			marginRight:0,
			marginBottom:0,
			marginLeft:-350
		};
		return (
			<div>
				<p>Welcome to Story Mixer Online! A cooperative storytelling game for people who like to come up with ideas and combine them with others.</p>
				<img src={FairyMascotSplashImage} alt="Fairy Mascot" style={{width:"100%"}} /><br />
				<hr />
				{/* debug start test avatar */}
				<div id="avatar-container" style={gymGuyAvatarStyle}>
					<img id="testavatar" style={imgStyle} src={GymGuySuccessImage} /><br />
				</div>
				{/* debug end test avatar */}
				<div id="join">
					Join an existing game?<br />
					Game Room Code:<br />
					<input id="room_code" /><br />
					Player Name:<br />
					<input id="player_name" /><br />
					<button id="join_button" onClick="joinRoomFromForm();">Join</button><br />
				</div>
				<hr />
				<div id="create">
					Create a game?<br />
					Creator Player Name:<br />
					<input id="creator_player_name" /><br />
					<button id="create_button" onClick="createRoom();">Create</button><br />
				</div>
				<hr />
				<div id="test">
					# Debug Test #<br />
					stop listening?<br />
					<button id="stop_listening_button" onClick="stopListening();">Stop Listening</button><br />
				</div>
				<hr />
				By using this website you agree that we are not liable for your use of our game, any content you submit is fair use, and you will not disrupt or harass other players.<br />
				<br />
				<Link to="/info">Info</Link> {/*make this a circled "i" info button*/}
				<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>
				<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-firestore.js"></script>
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
