import React, { Component, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRoom, joinRoomFromForm } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuy_victory.png';
import BlueHairIdleImage from '../assets/blue_idle.png';
import { useAppCtx } from '../store';

export default function Home() {
	const [ joinRoomCode, setJoinRoomCode ] = useState('');
	const [ joinPlayerName, setJoinPlayerName ] = useState('');
	const [ creatorPlayerName, setCreatorPlayerName ] = useState();
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState(null);
	const navigate = useNavigate();
	const appCtx = useAppCtx()


	const handleJoinRoomCodeChange = (e) => {
		console.log("handleJoinRoomCodeChange");
		console.log(e);
		setJoinRoomCode(e.target.value);
	};
	const handleJoinPlayerNameChange = (e) => {
		console.log("handleJoinPlayerNameChange");
		console.log(e);
		setJoinPlayerName(e.target.value);
	};
	const handleJoinClick = (e) => {
		e.preventDefault();
		// TODO: remove these debug default value setters for final release
		if( joinRoomCode.length === 0 )
		{
			setJoinRoomCode("BG263");
			setJoinPlayerName("joiner8136");
		}
		if( joinRoomCode.length !== 5 )
		{
			console.error('Invalid room code!');
			alert('Invalid room code!');
			setError('Invalid room code!');
			console.log(error);
			return;
		}
		setError('');
		try {
			console.log("handleJoinClick calling joinRoomFromForm room joinPlayerName:"+joinPlayerName);
			joinRoomFromForm(joinRoomCode, joinPlayerName, (creatorPlayerName) => {
				appCtx.setRoomCode(joinRoomCode);
				appCtx.setPlayerName(joinPlayerName);
				setCreatorPlayerName(creatorPlayerName);
				console.log("Home room joined callback");
				navigate('/lobby');
			});
		} catch (error) {
			setError(error.message);
		}

	};
	const handleCreateSubmit = (e) => {
		e.preventDefault();
		setError('');
		try {
			console.log("handleCreateSubmit calling createRoom room creatorPlayerName:"+creatorPlayerName);
			createRoom(creatorPlayerName, (newRoomCode) => {
				appCtx.setRoomCode(newRoomCode);
				appCtx.setPlayerName(creatorPlayerName);
				console.log("Home room created callback");
				navigate('/lobby');  // redirect to lobby
			});
		} catch (error) {
			setError(error.message);
		}
	};

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
				{error ? <p>{error}</p> : null}
			</div>
			<div id="join">
				<b>Join an existing game?</b><br />
				Game Room Code:<br />
				<input onChange={handleJoinRoomCodeChange} id="room_code" /><br />
				Player Name:<br />
				<input onChange={handleJoinPlayerNameChange} id="player_name" /><br />
				<button id="join_button" onClick={handleJoinClick}>Join</button><br />
			</div>
			<hr />
			<div id="create">
				<form onSubmit={handleCreateSubmit}>
					<b>Create a game?</b><br />
					Creator Player Name:<br />
					<input onChange={(e) => {setCreatorPlayerName(e.target.value)}} value={creatorPlayerName} id="creator_player_name" /><br />
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
			<form>
				<h1>
					Sign Up to <Link to="/">Chatty</Link>
				</h1>
				<p>Fill in the form below to create an account.</p>
				<div>
					<input placeholder="Email" name="email" type="email" onChange={(e) => {setEmail(e.target.value)}} value={email}></input>
				</div>
				<div>
					<input placeholder="Password" name="password" onChange={(e) => {setPassword(e.target.value)}} value={password} type="password"></input>
				</div>
				<div>
					{error ? <p>{error}</p> : null}
					<button type="submit">Sign up</button>
				</div>
				<hr></hr>
				<p>Already have an account? <Link to="/login">Login</Link></p>
			</form>
		</div>
	)
}