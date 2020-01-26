import React, { useState, useEffect, useCallback }  from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from '../services/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container:{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap:  theme.spacing(1)
  },
  button: {
    width: '100%',
  },
  createButton: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  }

}));

export default function CharacterList(props) {
  const classes = useStyles();  
  const [loading, setLoading] = useState(true);
  const [renderedCharacters, setRenderedCharacters] = useState([]);
  const history = useHistory();

  const navToTrainerPage = useCallback((characterId) => {
    history.push("/trainer-sheet/" + characterId);
  },[history])

  const navToCreateTrainer = () => {
    history.push("/create-trainer")
  }

  const deleteCharacter = useCallback(async (characterId, index) => {
    props.handleSpinner(true)
    await firebase.collection('users')
      .doc(props.currentUser.username)
        .collection('trainers')
          .doc(characterId)
            .delete()
              .then(() => {
                props.handleSpinner(false)
              })
    // let apiName = urls.name; 
    // let path = urls.delete + characterId;
    // const options = {
    //   headers: {
    //     Authorization: props.currentUser.signInUserSession.idToken.jwtToken
    //   }
    // }
    // let pokemonPath = urls.deleteParty + characterId;
    // let pokedexPath = urls.deletePokedex + characterId;
    // await API.del(apiName, path, options)
    //   .then(async () => {
    //     await API.del(apiName, pokemonPath, options)
    //       .then(async () => {
    //         await API.del(apiName, pokedexPath, options)
    //         .then(props.handleSpinner(false))
    //         .catch(error => console.log(error))
    //       })
    //       .catch(error => console.log(error))
    //   }).catch(error => console.log(error));
  },[props])
  
  const renderCharacters = useCallback((list) => {
    const characters = list.map((character, index) =>{
      return(
        <Card variant="outlined" key={index} className={classes.root}>
          <CardContent>
            <Typography variant="h6">
              {character.name}
            </Typography>
            <Typography variant="subtitle2">
              Level: {character.level}
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.createButton}
                onClick={() => navToTrainerPage(character.id)}>
                View
              </Button>
            <Button 
              variant="contained" 
              color="default" 
              disableElevation
              className={classes.button}
              onClick={() => deleteCharacter(character.id, index)}>
              delete
            </Button>
          </CardContent>        
        </Card>
      )
    });
    return(characters);
  }, [classes.button, classes.root, navToTrainerPage, classes.createButton, deleteCharacter])


  const fetchData = useCallback(async() => {
    const trainersRef = await firebase.collection('users')
      .doc(props.currentUser.username)
        .collection('trainers')
          .get()
    const trainersList=[];
    await trainersRef.docs.forEach(doc => {
      const trainerData = {
        id: doc.data().id,
        name: doc.data().trainerSheet.info.name,
        level: doc.data().trainerSheet.info.level,
      }
      trainersList.push(trainerData)
    });
    const characters = renderCharacters(trainersList);
    setRenderedCharacters(characters);
    setLoading(false);
  },[props.currentUser.username, renderCharacters]);

  useEffect(() => {
    if(loading){            
      fetchData();
    }    
  }, [loading, fetchData]);

  if (loading) {
    return (
      <CircularProgress color="secondary"/>  
    );
  } else {
    return (
      <div className="body-container">
        <Button 
          variant="contained" 
          color="primary" 
          disableElevation
          className={classes.createButton}
          onClick={() => navToCreateTrainer()}>
          Create New Trainer
        </Button>
        <div className={classes.container}>
          { renderedCharacters }
        </div>
      </div>
    );
  }
}