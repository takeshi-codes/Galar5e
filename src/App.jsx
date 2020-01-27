import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
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

  // const firebaseClick = async () => {
  //   const apiName = urls.name;
  //   const path = urls.get + 'fb710550-3887-11ea-aa58-b104623b91ae';
  //   const pokemonPath = urls.getParty + 'fb710550-3887-11ea-aa58-b104623b91ae';
  //   const pokedexPath = urls.getPokedex + 'fb710550-3887-11ea-aa58-b104623b91ae';
  //   const apiTrainer = await API.get(apiName, path);
  //   const apiPokemon = await API.get(apiName, pokemonPath)
  //   const apiPokedex = await API.get(apiName, pokedexPath)
  //   const newTrainer = apiTrainer.character;
  //   const newInventory = apiTrainer.character.inventory;
  //   const newPokemon = apiPokemon.party.party;
  //   const newPokedex = apiPokedex.pokedex.pokedex;
  //   // firebase.collection("users").doc(newTrainer.userid).set({})
  //   const ref = firebase.collection("users").doc(newTrainer.userid).collection('trainers').doc()
  //   console.log(ref.id)
  //   ref.set({
  //     id: ref.id,
  //     trainer: newTrainer,
  //     inventory: newInventory,
  //     pokemon: newPokemon,
  //     pokedex: newPokedex
  //   }).then(() => {
  //     ref.get().then(doc => console.log(doc.data()))
  //   })
  //   // firebase.collection('users').doc(newTrainer.userid)
  //   // firebase.collection("users").doc(newTrainer.userid).collection(newTrainer.id).set({newTrainer})

    
  //   // firebase.collection("users").doc(newTrainer.userid).collection(newTrainer.id).doc('inventory').set({inventory: newInventory})
  //   // firebase.collection("users").doc(newTrainer.userid).collection(newTrainer.id).doc('pokemon').set({pokemon: newPokemon})
  //   // firebase.collection("users").doc(newTrainer.userid).collection(newTrainer.id).doc('pokedex').set({pokedex: newPokedex})
  
  // }


  return (
    !isAuthenticating && (
      <div className="App">
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {/* <Button onClick={firebaseClick}>Firebase</Button> */}
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
