import React, { Component } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Info from './pages/Info';
import Lobby from './pages/Lobby';
import SelfTrait from './pages/SelfTrait';
import OtherTrait from './pages/OtherTrait';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			creatorPlayerName: '',
			roomCodeToJoin: '',
			playerName: '',
			playerPortraitIndex: 0,
			selfTrait: '',
			otherTrait: '',
			obstacle: '',
			story: '',
			vote: 0
		};
	}

	componentDidMount() {
		this.setState({
			loading: false
		});
	}
	
	// needs to be a lambda because this can be called by other classes and 
	// a normal function would mess up the "this" reference
	handleStateChange = (name, value) => {
		console.log("handleStateChange called- "+name+":"+value);
		var newState = {};
		newState[name] = value;
		this.setState(newState);
	}

	render() {
		return this.state.loading === true ? (
			<div className="spinner-border text-success" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		) : (
			<Router>
				<Switch>
					<Route exact
						path="/"
						render={(props) => (
							<Home {...props} 
								creatorPlayerName={this.state.creatorPlayerName} 
								onStateChange={this.handleStateChange} 
							/>
						)}
					/>
					<Route exact
						path="/info"
						render={(props) => (
							<Info {...props} />
						)}
					/>
					<Route exact
						path="/lobby"
						render={(props) => (
							<Lobby {...props} 
								roomCodeToJoin={this.state.roomCodeToJoin} 
								playerName={this.state.playerName} 
								creatorPlayerName={this.state.creatorPlayerName} 
								onStateChange={this.handleStateChange} />
						)}
					/>
					<Route exact
						path="/selftrait"
						render={(props) => (
							<SelfTrait {...props} 
								roomCodeToJoin={this.state.roomCodeToJoin} 
								playerName={this.state.playerName} 
								playerPortraitIndex={this.state.playerPortraitIndex} 
								onStateChange={this.handleStateChange} />
						)}
					/>
					<Route exact
						path="/othertrait"
						render={(props) => (
							<OtherTrait {...props} 
								roomCodeToJoin={this.state.roomCodeToJoin} 
								playerName={this.state.playerName} 
								playerPortraitIndex={this.state.playerPortraitIndex} 
								selfTrait={this.state.selfTrait} 
								onStateChange={this.handleStateChange} />
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
