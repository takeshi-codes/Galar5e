import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import app from '../services/firebase';

const useStyles = makeStyles((theme) => ({
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
        },
}));

export default function ForgotPassword(props) {
        const classes = useStyles();
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleForgetPassword = async (event) => {
                event.preventDefault();
                setIsLoading(true);
                try {
                        app.auth()
                                .sendPasswordResetEmail(email)
                                .then(() => {
                                        alert(
                                                'An email has been sent containing the link to reset your password',
                                        );
                                        props.history.push('/login');
                                });
                } catch (e) {
                        alert(e.message);
                }
        };

        const validateEmailForm = () => email.length > 0;

        return (
                <div className={classes.root}>
                        <Card variant="outlined" className={classes.card}>
                                <CardContent>
                                        <form
                                                className={classes.root}
                                                autoComplete="off"
                                                id="emailForm"
                                                onSubmit={handleForgetPassword}
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
                                                        {isLoading ? (
                                                                <CircularProgress color="secondary" />
                                                        ) : (
                                                                <Typography>
                                                                        Send Password Reset
                                                                </Typography>
                                                        )}
                                                </Button>
                                                <Typography className={classes.button}>
                                                        Be sure to check your spam folder!
                                                </Typography>
                                        </form>
                                </CardContent>
                        </Card>
                </div>
        );
}
