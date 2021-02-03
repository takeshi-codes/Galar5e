import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import app from '../services/firebase';
import { AuthContext } from '../Auth';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 auto',
    width: '50%',
    top: '50%',
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  passwordButton: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default function User(props) {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    try {
      currentUser.updateEmail(email).then(() => {
        alert('Your email has been changed');
        setIsLoading(false);
      });
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  const validateEmailForm = () => email.length > 0;

  const handleResetPassword = () => {
    setIsLoading(true);
    app
      .auth()
      .sendPasswordResetEmail(currentUser.email)
      .then(() => {
        alert('An email has been sent containing the link to reset your password');
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <form
              className={classes.root}
              autoComplete="off"
              id="emailForm"
              onSubmit={handleEmailSubmit}
            >
              <TextField
                autoFocus
                required
                className={classes.input}
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                name="email"
              />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                disabled={!validateEmailForm()}
                type="submit"
              >
                <Typography>Update Email</Typography>
              </Button>
            </form>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              type="submit"
              onClick={handleResetPassword}
            >
              <Typography>Reset Password</Typography>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
