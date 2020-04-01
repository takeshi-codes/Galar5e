import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import app from '../../services/firebase';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 auto',
    width: '50%',
    top: '50%',
  },
  button: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const SignUp = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-shadow
      const { email, password } = event.target.elements;
      try {
        setIsLoading(true);
        await app.auth().createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (e) {
        alert(e.message);
        setIsLoading(false);
      }
    },
    [history],
  );

  const validateForm = () => email.length > 0
    && password.length > 0
    && confirmPassword.length > 0
    && password === confirmPassword;

  return (
    <div>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <form
            className={classes.root}
            autoComplete="off"
            id="userForm"
            onSubmit={handleSignUp}
          >
            <TextField
              autoFocus
              required
              className={classes.input}
              fullWidth
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
              name="email"
            />
            <TextField
              required
              fullWidth
              className={classes.input}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              variant="outlined"
              type="password"
            />
            <TextField
              required
              fullWidth
              className={classes.input}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              variant="outlined"
              type="password"
              name="confirmPassword"
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              disabled={!validateForm()}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Typography>Create Account</Typography>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRouter(SignUp);
