import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';

import Home from './containers/Home';
import CharacterSheet from './containers/CharacterSheet/CharacterSheet';
import User from './containers/User';
import ForgotPassword from './containers/ForgotPassword';
import CharacterList from './containers/CharacterList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './containers/NotFound';

export default function Routes(appProps) {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/trainer-sheet/:id" component={CharacterSheet} />
        <PrivateRoute exact path="/my-trainers" component={CharacterList} appProps={appProps} />
        <PrivateRoute exact path="/create-trainer" component={CharacterSheet} />
        <PrivateRoute exact path="/profile" component={User} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
