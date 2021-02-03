import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import app from '../services/firebase';
import { AuthContext } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: theme.spacing(1),
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
  },
}));

export default function CharacterList(props) {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [renderedCharacters, setRenderedCharacters] = useState([]);
  const history = useHistory();

  const navToTrainerPage = useCallback(
    characterId => {
      history.push(`/trainer-sheet/${characterId}`);
    },
    [history]
  );

  const navToCreateTrainer = () => {
    history.push('/create-trainer');
  };

  const deleteCharacter = useCallback(
    async characterId => {
      props.appProps.handleSpinner(true);
      if (currentUser !== undefined) {
        app
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('trainers')
          .doc(characterId)
          .delete()
          .then(() => {
            props.appProps.handleSpinner(false);
          });
      }
    },
    [props, currentUser]
  );

  const renderCharacters = useCallback(
    list => {
      const characters = list.map((character, index) => (
        <Card variant="outlined" key={index} className={classes.root}>
          <CardContent>
            <Typography variant="h6">{character.name}</Typography>
            <Typography variant="subtitle2">
              Level:
              {character.level}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.createButton}
              onClick={() => navToTrainerPage(character.id)}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="default"
              disableElevation
              className={classes.button}
              onClick={() => deleteCharacter(character.id, index)}
            >
              delete
            </Button>
          </CardContent>
        </Card>
      ));
      return characters;
    },
    [
      classes.button,
      classes.root,
      navToTrainerPage,
      classes.createButton,
      deleteCharacter,
    ]
  );

  const fetchData = useCallback(() => {
    if (currentUser !== undefined) {
      const usersRef = app.firestore().collection('users').doc(currentUser.uid);
      usersRef.get().then(doc => {
        if (doc.exists) {
          const trainersList = [];
          app
            .firestore()
            .collection('users')
            .doc(currentUser.uid)
            .collection('trainers')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const trainerData = {
                  id: doc.data().id,
                  name: doc.data().trainerSheet.info.name,
                  level: doc.data().trainerSheet.info.level,
                };
                trainersList.push(trainerData);
              });
              const characters = renderCharacters(trainersList);
              setRenderedCharacters(characters);
              setLoading(false);
            });
        } else {
          usersRef.set({});
          setRenderedCharacters(null);
          setLoading(false);
        }
      });
    }
  }, [currentUser, renderCharacters]);

  useEffect(() => {
    if (loading && currentUser !== undefined) {
      fetchData();
    }
  }, [loading, fetchData, currentUser]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <div className="body-container">
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.createButton}
        onClick={() => navToCreateTrainer()}
      >
        Create New Trainer
      </Button>
      <div className={classes.container}>{renderedCharacters}</div>
    </div>
  );
}
