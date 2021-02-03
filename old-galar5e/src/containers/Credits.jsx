import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  grid: {
    minWidth: '100%',
  },
  card: {
    minHeight: '100%',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
}));

export default function AddPokemon(props) {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1" gutterBottom className={classes.label}>
            Check out the &quot;official&quot; resources and more!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            onClick={() => window.open('https://www.pokemon5e.com/')}
          >
            Pokemon5e.com
          </Button>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1" gutterBottom className={classes.label}>
            Take Pokemon5e on the go with the companion mobile app, available on
            iOS and Android
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            onClick={() => window.open('https://www.pokemon5e.com/#pokedex5e')}
          >
            Downloads
          </Button>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1" gutterBottom className={classes.label}>
            Pokemon 5e is created and made possible by JoeTheDM, host of You
            Meet In A Tavern
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            onClick={() => window.open('https://ko-fi.com/joethedm')}
          >
            Check him out here!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
