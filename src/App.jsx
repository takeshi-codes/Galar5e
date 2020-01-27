import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthProvider } from './Auth';
import app from './services/firebase';

import Routes from "./Routes";

import Header from './components/Header/Header';

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

const  App = (props) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    try {
      setLoading(true);
      app.auth().onAuthStateChanged(user => {
        setLoading(false);
      })
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }  
    setIsAuthenticating(false);
  }

  const handleLogout = async() => {
    await app.auth().signOut();
    props.history.push("/login");
  }

  const handleSpinner = (status) => {
    setLoading(status);
  }

  return (
    !isAuthenticating && (
      <div className="App">
        <AuthProvider>
          <ThemeProvider theme={theme}>
            { loading ? (
              <CircularProgress color="secondary"/>
            ): 
            (
              <div>
                <Header logout={handleLogout}/>
                <Routes appProps={{handleSpinner}}/>
              </div>
            )}
          </ThemeProvider>
        </AuthProvider>
      </div>
    )
  );
}

export default withRouter(App);
