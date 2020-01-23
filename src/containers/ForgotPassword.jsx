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
    top: '50%',
    marginBottom: theme.spacing(2),
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
  label: {
    marginTop: theme.spacing(2),
  }

}));


export default function ForgotPassword(props) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFieldChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }
  
  const handleSendCode  = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.confirmationCode,
        fields.newPassword
      );
      setConfirmed(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  
  const validateEmailForm = () => {
    return (
      fields.email.length > 0
    )
  }

  const validatePasswordForm = () => {
    return (
      fields.confirmationCode.length > 0 &&
      fields.newPassword.length > 0 &&
      fields.confirmPassword.length > 0 &&
      fields.newPassword === fields.confirmPassword
    )
  }

  const navToLogin = () => {
    props.history.push('/login')
  }

  const renderForm = () => {
    return(
      <div className={classes.root}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <form 
              className={classes.root} 
              autoComplete="off" 
              id="emailForm"
              onSubmit={handleSendCode}>
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
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.button}
                disabled={!validateEmailForm()}
                type="submit">
                {isLoading ? 
                  (<CircularProgress color="secondary"/>) :
                  (<Typography>Send Confirmation</Typography>)}
              </Button>
              <Typography className={classes.button}>
                Be sure to check your spam folder!
              </Typography>
            </form>
          </CardContent>        
        </Card>
      </div>
    )
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
              onSubmit={handlePasswordReset}>
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
              <TextField
                required
                fullWidth
                className={classes.input} 
                label="New Password"
                value={fields.newPassword}
                onChange={handleFieldChange}
                name='newPassword' 
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
                disabled={!validatePasswordForm()}
                type="submit">
                {isLoading ? 
                  (<CircularProgress color="secondary"/>) :
                  (<Typography>Update Password</Typography>)}
              </Button>
              <Typography>Be sure to check your spam folder!</Typography>
            </form>
          </CardContent>        
        </Card>
    </div>
    )
  }

  const renderSuccessMessage = () => {
    return (
        <Card variant="outlined" className={classes.card}>
          <CardContent>
          <Typography>Your password has been reset.</Typography>
          <Button 
                variant="contained" 
                color="primary" 
                disableElevation
                className={classes.button}
                onClick={navToLogin}>
                <Typography>Click here to login with your new credentials.</Typography>
              </Button>
          </CardContent>
        </Card>
    );
  }
  return (
    <div className="Signup">
      {!codeSent
        ? renderForm()
        : !confirmed
          ? renderConfirmationForm()
          : renderSuccessMessage()}    
    </div>
  );
}
