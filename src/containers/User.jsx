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
  }

}));


export default function User(props) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [confirmEmail, setconfirmEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordIsLoading, setPasswordIsLoading] = useState(false);

  const handleFieldChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }
  
  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: fields.email });
      setIsLoading(false);
      setconfirmEmail(true)
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setPasswordIsLoading(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.newPassword
      );
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      console.log(fields.email, fields.confirmationCode)
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.confirmationCode);
      props.userHasAuthenticated(true);
      props.history.push("/");
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
      fields.oldPassword.length > 0 &&
      fields.newPassword.length > 0 &&
      fields.confirmPassword.length > 0 &&
      fields.newPassword === fields.confirmPassword
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
              id="emailForm"
              onSubmit={handleEmailSubmit}>
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
                  (<Typography>Update Email</Typography>)}
              </Button>
            </form>
          </CardContent>        
        </Card>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <form 
              className={classes.root} 
              autoComplete="off" 
              id="passwordForm"
              onSubmit={handlePasswordSubmit}>
              <TextField
                required
                fullWidth
                className={classes.input} 
                label="Old Password"
                value={fields.oldPassword}
                onChange={handleFieldChange}
                name='oldPassword' 
                variant="outlined"
                type='password'
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
                {passwordIsLoading ? 
                  (<CircularProgress color="secondary"/>) :
                  (<Typography>Update Password</Typography>)}
              </Button>
            </form>
          </CardContent>        
        </Card>
      </div>
    )
  }

  return (
    <div className="Signup">
      {confirmEmail === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
