import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FairyMascotSplashImage from './Fairy_Mascot.jpg';

export default class SignUp extends Component {
	render() {
		return (
			<div>
				<p>Welcome to Story Mixer Online! A cooperative storytelling game for people who like to come up with ideas and combine them with others.</p>
				<img src={FairyMascotSplashImage} alt="Fairy Mascot" style={{width:"100%"}} /><br />
				<hr />
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
