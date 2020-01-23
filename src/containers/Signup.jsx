import React, { useState }  from 'react';
import { Auth } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '0 auto',
    width: '50%',
    top: '50%'
  },
  button: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  input: {
    marginBottom: theme.spacing(2),
  }

}));


function Signup(props) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  
  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    )
  }

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  }

  const renderConfirmationForm = () => {
    return(
      <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
          <CardContent>
            <form 
              className={classes.root} 
              autoComplete="off" 
              id="confirmationCode"
              onSubmit={handleConfirmationSubmit}>
              <TextField
                type="tel"
                onChange={handleFieldChange}
                value={fields.confirmationCode}
                variant="outlined"
                autoFocus
                required
                className={classes.input}
                fullWidth 
                label="Confirmation Code"
                name="confirmationCode"
              />              
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.button}
                disabled={!validateConfirmationForm()}
                type="submit">
                {isLoading ? 
                  (<CircularProgress color="secondary"/>) :
                  (<Typography>Verify</Typography>)}
              </Button>
              <Typography>Be sure to check your spam folder!</Typography>
            </form>
          </CardContent>        
        </Card>
    </div>
    )
  }

  const renderForm = () => {
    return(
      <div className={classes.root}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <form 
              className={classes.root} 
              autoComplete="off" 
              id="userForm"
              onSubmit={handleSubmit}>
              <TextField
                autoFocus
                required
                className={classes.input}
                fullWidth 
                type="email"
                label="Email"
                value={fields.email}
                onChange={handleFieldChange} 
                variant="outlined"
                name="email"
              />
              <TextField
                required
                fullWidth
                className={classes.input} 
                label="Password"
                value={fields.password}
                onChange={handleFieldChange}
                name='password' 
                variant="outlined"
                type='password'
              />
              <TextField
                required
                fullWidth
                className={classes.input} 
                label="Confirm Password"
                value={fields.confirmPassword}
                onChange={handleFieldChange} 
                variant="outlined"
                type='password'
                name="confirmPassword"
              />
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.button}
                disabled={!validateForm()}
                type="submit">
                {isLoading ? 
                  (<CircularProgress color="secondary"/>) :
                  (<Typography>Create Account</Typography>)}
              </Button>
            </form>
          </CardContent>        
        </Card>
      </div>
    )
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}

export default Signup;
