import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Info from './pages/Info';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles.css';


function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
          <Component {...props} />
        )
      }
    />
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }
  
  // needs to be a lambda because this can be called by other classes and 
  // a normal function would mess up the "this" reference
  handleRouteChange = (path) => {
		console.log("handleRouteChange called: "+path);
		this.setState({
			redirect: path
		});
  }

  render() {
		if( this.state.redirect ) {
			return <Router><Redirect to={this.state.redirect} /></Router>
		}
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
								<Home {...props} onRouteChange={this.handleRouteChange} />
							)}
						/>
            <PublicRoute
              path="/info"
              render={(props) => (
								<Info {...props} onRouteChange={this.handleRouteChange} />
							)}
            />
            <PublicRoute
              path="/signup"
              render={(props) => (
								<Signup {...props} onRouteChange={this.handleRouteChange} />
							)}
            />
            <PublicRoute
              path="/login"
              render={(props) => (
								<Login {...props} onRouteChange={this.handleRouteChange} />
							)}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;
