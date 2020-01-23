import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Auth } from "aws-amplify";

import Routes from "./Routes";

import Header from './components/Header/Header';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#34421E'
    },
    secondary: {
      main: '#C1943F',
    },
  },
});

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async() => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      await Auth.currentAuthenticatedUser({
      }).then(user => {
        setCurrentUser(user);
      })
      .catch(err => console.log(err));
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  const handleLogout = async() => {
    await Auth.signOut();  
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  const handleSpinner = (status) => {
    setLoading(status);
  }


  return (
    !isAuthenticating && (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header auth={isAuthenticated} logout={handleLogout}/>
          { loading ? (
            <CircularProgress color="secondary"/>
          ): 
          (
            <Routes appProps={{ isAuthenticated, userHasAuthenticated, currentUser, handleSpinner }} />
          )}
        </ThemeProvider>
      </div>
    )
  );
}

export default withRouter(App);
