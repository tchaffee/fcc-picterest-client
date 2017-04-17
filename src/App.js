import './App.css';
import React, { Component } from 'react';
import history from './utils/history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavHeader from './NavHeader';
import Home from './Home';
import Logout from './Logout';
import Login from './Login';

import AuthService from './utils/AuthService';
const auth = new AuthService('xgk3Iwy5uWQt8tnzZjjIdrw0N2shXnug', 'tchaffee.auth0.com');

const NotFound = () => (
  <h1>404.. Page does not exist.</h1>
);

const NotAuthorized = () => (
  <h3>Oops, you are not authorized to do that. Your login probably expired, so please try logging in again.</h3>
);

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirectPath: false
    };

  }



  render() {

    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    }

    const PrivateRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return auth.loggedIn() ? (
            renderMergedProps(component, routeProps, rest)
          ) : (
            <Redirect to={{
              pathname: '/',
              state: { from: routeProps.location }
            }}/>
          );
        }}/>
      );
    };

    return (
      <Router history={history}>
        <div className="App">
          <NavHeader auth={auth} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/login' render={routeProps => <Login {...routeProps} auth={auth} authenticatedRedirect="/" />} />
            <PrivateRoute path='/logout' component={Logout} auth={auth} redirectPath="/" />
            <Route path='/notauthorized' component={NotAuthorized} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
