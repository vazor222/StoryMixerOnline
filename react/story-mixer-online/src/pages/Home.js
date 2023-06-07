import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoomFromForm } from '../helpers/rooms';
// import FairyMascotSplashImage from '../assets/Fairy_Mascot.jpg';
// import GymGuySuccessImage from '../assets/GymGuy_victory.png';
import BlueHairIdleImage from '../assets/blue_idle.png';
import { useAppCtx } from '../store';
import {
	Grid,
	Card,
	Typography,
	alpha,
	useTheme,
	Button,
	FormLabel,
	Divider,
	Alert
} from '@mui/material';
import { TopBar, FooterBar, ChattySignup } from '../components';
import { StyledFormControl, StyledFormGroup, StyledTextField, MainGridContainer, MainGridItem} from '../components/styled';

export default function Home() {
	const [ joinRoomCode, setJoinRoomCode ] = useState('');
	const [ joinPlayerName, setJoinPlayerName ] = useState('');
	const [ creatorPlayerName, setCreatorPlayerName ] = useState('');
	const [ error, setError ] = useState(null);
	const navigate = useNavigate();
	const appCtx = useAppCtx();
	const theme = useTheme();

	const handleJoinRoomCodeChange = (e) => {
		// console.log("handleJoinRoomCodeChange");
		// console.log(e);
		setJoinRoomCode(e.target.value);
	};
	const handleJoinPlayerNameChange = (e) => {
		// console.log("handleJoinPlayerNameChange");
		// console.log(e);
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

	return (
		<MainGridContainer container>
			<TopBar />

			{/* debug start test avatar */}
			<MainGridItem item xs={12}>
				<Card
					sx={{
						borderLeft: `10px solid ${theme.palette.secondary.main}`,
						width: '80%',
						maxWidth: theme.breakpoints.values.md,
						boxShadow: theme.shadows[4]
					}}
				>
						<Grid container>
							<Grid item
								xs={5}
								sx={{
									backgroundColor: alpha(theme.palette.primary.light, .3),
									textAlign: 'left',
									paddingLeft: 4,
									paddingRight: 4
								}}
							>
								<StyledFormControl id="join">
									<Typography variant='h5' marginBottom={3}>Join an existing game?</Typography>
									<StyledFormGroup>
										<FormLabel>Player Name:</FormLabel>
										<StyledTextField
											variant='outlined'
											onChange={handleJoinPlayerNameChange}
											value={joinPlayerName}
										/>
									</StyledFormGroup>
									<StyledFormGroup>
										<FormLabel id='room_code'>Game Room Code:</FormLabel>
										<StyledTextField
											variant='outlined'
											onChange={handleJoinRoomCodeChange}
											key="room_code"
											value={joinRoomCode}
										/>
									</StyledFormGroup>
									<Button id="join_button" variant='contained' color='secondary' onClick={handleJoinClick}>Join</Button>
								</StyledFormControl>
								<Divider />
								<StyledFormControl id="create">
									<Typography variant='h5' marginBottom={3}>Create a game?</Typography>
									<StyledFormGroup>
										<FormLabel id="creator_name">Player Name:</FormLabel>
										<StyledTextField
											variant='outlined'
											key="creator_name"
											onChange={(e) => {setCreatorPlayerName(e.target.value)}}
											value={creatorPlayerName}
										/>
									</StyledFormGroup>
									<Button
										id="create_button"
										variant='contained'
										color='secondary'
										type="submit"
										onClick={handleCreateSubmit}
									>
										Create
									</Button>
								</StyledFormControl>
							</Grid>
							<Grid item xs={7}
								sx={{
									backgroundImage: `url(${BlueHairIdleImage})`,
									backgroundColor: theme.palette.background.default,
									backgroundRepeat: 'no-repeat',
									backgroundPositionY: 'bottom',
									backgroundPositionX: 'center',
									backgroundSize: 'cover',
								}}
							/>
						</Grid>
				</Card>
			</MainGridItem>
			{
				error ?
				<Alert severity="error" sx={{ width: '100%' }}>{error ? error : null}</Alert> :
				null
			}
			<ChattySignup />
			<FooterBar />
		</MainGridContainer>
	)
}