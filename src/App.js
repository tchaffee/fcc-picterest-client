import './App.css';
import React, { Component } from 'react';
import history from './utils/history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavHeader from './NavHeader';
import Home from './Home';
import Logout from './Logout';
import Login from './Login';
import Pics from './Pics';
import AddPic from './AddPic';

import { getAllPics, getMyPics, getUserPics, addPic, deletePic, likePic } from './models/picsModel';


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
      redirectPath: false,
      auth: auth
    };

    window.auth = auth;

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
            <PrivateRoute path="/mypics" component={Pics} dataGetter={getMyPics} handleDelete={deletePic} handleLike={likePic} />
            <PrivateRoute path="/allpics" component={Pics} dataGetter={getAllPics} handleLike={likePic} />
            <PrivateRoute path="/addpic" component={AddPic} addPic={addPic} />
            <PrivateRoute path="/pics/:userid" component={Pics} dataGetter={getUserPics} handleLike={likePic} handleDelete={deletePic} />
            <Route path='/notauthorized' component={NotAuthorized} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
