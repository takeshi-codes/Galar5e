import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/Routes/AppliedRoute";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

import Home from './containers/Home'
import CharacterSheet from './containers/CharacterSheet/CharacterSheet';
import User from './containers/User';
import ForgotPassword from './containers/ForgotPassword';
import CharacterList from './containers/CharacterList';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <UnauthenticatedRoute path="/forgot-password" exact component={ForgotPassword} appProps={appProps} />
      <AuthenticatedRoute  path="/trainer-sheet/:id" component={ CharacterSheet } appProps={appProps}/> 
      <AuthenticatedRoute  path="/my-trainers" component={ CharacterList } appProps={appProps}/>
      <AuthenticatedRoute  path="/create-trainer" exact component={ CharacterSheet } appProps={appProps}/>
      <AuthenticatedRoute  path="/profile" exact component={ User } appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}