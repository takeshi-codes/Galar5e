import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from '../Auth';

import Credits from './Credits';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '0 auto',
    width: '50%',
    top: '50%'
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(2),
  },
}));


const Home = (props) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const navToSignup = () => {
    props.history.push("/signup");
  }

  const navToLogin = () => {
    props.history.push("/login");
  }
  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h2" component="h2" gutterBottom className={classes.label}>
            Welcome to Galar 5e!
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.label}>
            The online companion to Pokemon 5e, the Pokemon homebrew system for Dungeons and Dragons 5e. 
            To get started, all you need is a few friends, the D&amp;D Basic Rules, a couple of dice (or a dice app!) and of course the Pokémon5E supplement!
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.label}>
            Galar5e is able to track your character sheets, items for each character, as well as all of your Pokemon!
            More is coming soon, so be sure to check back for details!
          </Typography>       
          {currentUser ? 
            (<div>
            </div>) : 
            (<div>
              <Typography variant="body1" gutterBottom className={classes.label}>
                Login or make an account by using the buttons below.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.button}
                onClick={navToLogin}>
                  Login
              </Button>
              <Button 
              variant="contained" 
              color="primary" 
              disableElevation
              className={classes.button}
              onClick={navToSignup}>
                Signup
              </Button>
            </div>
          )}
          <Credits />          
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
