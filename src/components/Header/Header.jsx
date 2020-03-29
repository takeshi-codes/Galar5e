import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {AuthContext} from "../../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

export default function Header(props) {
  const {currentUser} = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const navToTrainersPage = () => {
    history.push("/my-trainers");
  };

  const navToSignup = () => {
    history.push("/signup");
  };

  const navToLogin = () => {
    history.push("/login");
  };

  const navToProfile = () => {
    history.push("/profile");
  };

  const navToHome = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={navToHome}>
            Galar 5e
          </Typography>
          {currentUser ? (
            <div>
              <ButtonGroup variant="contained" color="default">
                <Button onClick={navToProfile}>Profile</Button>
                <Button onClick={navToTrainersPage}>Trainers</Button>
                <Button onClick={props.logout}>Logout</Button>
              </ButtonGroup>
            </div>
          ) : (
            <div>
              <ButtonGroup variant="contained" color="default">
                <Button onClick={navToLogin}>Login</Button>
                <Button onClick={navToSignup}>Signup</Button>
              </ButtonGroup>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
