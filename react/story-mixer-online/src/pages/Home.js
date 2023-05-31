import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRoom, joinRoomFromForm } from '../helpers/rooms';
import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
import GymGuySuccessImage from '../assets/GymGuy_victory.png';
import BlueHairIdleImage from '../assets/blue_idle.png';
import { useAppCtx } from '../store';
import { AppBar, Grid, Box, Card, TextField, Typography, alpha, useTheme, CardMedia, FormControl, Input, Button, FormLabel, styled, Divider, FormGroup, Alert, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/HelpRounded'

export default function Home() {
	const [ joinRoomCode, setJoinRoomCode ] = useState('');
	const [ joinPlayerName, setJoinPlayerName ] = useState('');
	const [ creatorPlayerName, setCreatorPlayerName ] = useState();
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState(null);
	const navigate = useNavigate();
	const appCtx = useAppCtx();
	const theme = useTheme();

	const StyledTextField = styled(TextField)(({theme})=>({
			backgroundColor: theme.palette.background.paper,
			borderRadius: 4,
	}))
	const StyledFormGroup = styled(FormGroup)(({theme})=>({
		marginBottom: theme.spacing(2)
	}))
	const StyledFormControl = styled(FormControl)(({theme})=>({
		padding: theme.spacing(3),
		minWidth: 275,
		textAlign: 'left'
	}))

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
		<Grid container>
			<AppBar position='static'
				sx={{ 
					backgroundColor: theme.palette.primary.main,
					bottomBorder: `3px solid ${theme.palette.secondary.light}`
				}}
			>
				<Box padding={2} display={'flex'} alignItems={'center'} columnGap={2}>
					<Box
						sx={{
							backgroundRepeat: 'no-repeat',
							backgroundImage: `url(${FairyMascotSplashImage})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							height: 100,
							width: 150,
							marginTop: -2,
							marginBottom: -2,
						}}
					/>
					<Typography variant='h5' component={'span'}>Welcome to Story Mixer Online! </Typography>
					<Typography variant='h6' component={'span'} color={alpha(theme.palette.common.white, 0.75)}>A cooperative storytelling game for people who like to come up with ideas and combine them with others.</Typography>
				</Box>
			</AppBar>
			{/* <Box
					component={'img'}
					src={FairyMascotSplashImage}
					alt="Fairy Mascot"
			/> */}

			{/* <img src={FairyMascotSplashImage} alt="Fairy Mascot" style={{width:"100%"}} /><br /> */}

			{/* debug start test avatar */}
			<Grid item
				padding={4}
				xs={12}
				sx={{
					backgroundColor: theme.palette.primary.light,
					justifyContent: 'center'
				}}
			>
				<Card sx={{ borderLeft: `10px solid ${theme.palette.secondary.main}` }}>
						<Grid container>
							<Grid item
								xs={5}
								sx={{
									backgroundImage: `url(${BlueHairIdleImage})`,
									backgroundColor: theme.palette.background.default,
									backgroundRepeat: 'no-repeat',
									backgroundPositionY: 'bottom',
									backgroundPositionX: 'center'
								}}
							/>
							<Grid item
								xs={7}
								sx={{
									backgroundColor: alpha(theme.palette.primary.light, 0.25),
									textAlign: 'center',
									paddingLeft: 4,
									paddingRight: 4
								}}
							>
								<StyledFormControl id="join">
									<Typography variant='h5' marginBottom={3}>Join an existing game?</Typography>
									<StyledFormGroup>
										<FormLabel>Player Name:</FormLabel>
										<StyledTextField variant='outlined' onChange={handleJoinPlayerNameChange} id="player_name" />
									</StyledFormGroup>
									<StyledFormGroup>
										<FormLabel>Game Room Code:</FormLabel>
										<StyledTextField variant='outlined' onChange={handleJoinRoomCodeChange} id="room_code" />
									</StyledFormGroup>
									<Button id="join_button" variant='contained' color='secondary' onClick={handleJoinClick}>Join</Button>
								</StyledFormControl>
								<Divider />
								<StyledFormControl id="create">
									<Typography variant='h5' marginBottom={3}>Create a game?</Typography>
									<StyledFormGroup>
										<FormLabel>Player Name:</FormLabel>
										<StyledTextField variant='outlined' onChange={handleJoinPlayerNameChange} id="player_name" />
									</StyledFormGroup>
									<Button id="create_button" variant='contained' color='secondary' type='submit'>Create</Button>
								</StyledFormControl>
							</Grid>
						</Grid>
				</Card>
			</Grid>
			{
				error ?
				<Alert severity="error" sx={{ width: '100%' }}>{error ? error : null}</Alert> :
				null
			}
			<Grid item padding={4} sx={{
				display: 'flex',
				columnGap: 3,
				alignItems: 'center',
				width: '100%',
				justifyContent: 'space-between',
			}}>
				<Typography variant='caption' color={theme.palette.info.main}>
					By using this website you agree that we are not liable for your use of our game,
					any content you submit is fair use, and you will not disrupt or harass other players.
				</Typography>
				<Button variant='outlined' to="/info" startIcon={<InfoIcon color='secondary' />}>
						Info
				</Button>
			</Grid>
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
		</Grid>
	)
}