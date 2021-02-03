import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import app from '../../services/firebase';
import { AuthContext } from '../../Auth';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '0 auto',
    width: '50%',
    top: '50%',
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  forgotButton: {
    width: '100%',
  },
}));

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        history.push('/');
      } catch (e) {
        alert(e.message);
        setIsLoading(false);
      }
    },
    [history, email, password]
  );

  const validateForm = () => email.length > 0 && password.length > 0;

  const navToForgotPage = () => {
    history.push('/forgot-password');
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <form
            className={classes.root}
            autoComplete="off"
            id="userForm"
            onSubmit={handleLogin}
          >
            <TextField
              required
              className={classes.input}
              fullWidth
              type="email"
              label="Email"
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
              value={email}
            />
            <TextField
              required
              fullWidth
              className={classes.input}
              label="Password"
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
              value={password}
              type="password"
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
                <Typography>Login</Typography>
              )}
            </Button>
          </form>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={navToForgotPage}
            className={classes.forgotButton}
          >
            <Typography>Forgot Password?</Typography>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRouter(Login);
