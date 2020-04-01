import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
        statInterior: {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'repeat(2, 1fr)',
        },
        modifier: {
                maxWidth: '60%',
                margin: '0 auto',
        },
}));

export default function StatBlock(props) {
        const classes = useStyles();
        const [modifier, setModifier] = useState(0);
        const [textVariant, setTextVariant] = useState('outlined');
        const [inputProps, setInputProps] = useState({ readOnly: false });

        const updateMod = useCallback(() => {
                const stat = Number(props.statNum);
                let mod = modifier;
                if (stat === 1) {
                        mod = '-5';
                } else if (stat === 2 || stat === 3) {
                        mod = '-4';
                } else if (stat === 4 || stat === 5) {
                        mod = '-3';
                } else if (stat === 6 || stat === 7) {
                        mod = '-2';
                } else if (stat === 8 || stat === 9) {
                        mod = '-1';
                } else if (stat === 10 || stat === 11) {
                        mod = '0';
                } else if (stat === 12 || stat === 13) {
                        mod = '+1';
                } else if (stat === 14 || stat === 15) {
                        mod = '+2';
                } else if (stat === 16 || stat === 17) {
                        mod = '+3';
                } else if (stat === 18 || stat === 19) {
                        mod = '+4';
                } else if (stat === 20 || stat === 21) {
                        mod = '+5';
                } else if (stat === 22 || stat === 23) {
                        mod = '+6';
                } else if (stat === 24 || stat === 25) {
                        mod = '+7';
                } else if (stat === 26 || stat === 27) {
                        mod = '+8';
                } else if (stat === 28 || stat === 29) {
                        mod = '+9';
                } else if (stat === 30) {
                        mod = '+10';
                }
                setModifier(mod);
        }, [modifier, props.statNum]);

        useEffect(() => {
                updateMod();
                if (!props.isEditable) {
                        setTextVariant('outlined');
                        setInputProps({ readOnly: false });
                } else {
                        setTextVariant('filled');
                        setInputProps({ readOnly: true });
                }
        }, [props.isEditable, updateMod]);

        return (
                <div>
                        <Card variant="outlined">
                                <CardContent className={classes.statInterior}>
                                        <TextField
                                                onChange={props.update}
                                                name={props.statName}
                                                label={props.statName}
                                                type="number"
                                                defaultValue={props.statNum}
                                                variant={textVariant}
                                                InputProps={inputProps}
                                        />
                                        <Chip
                                                label={modifier}
                                                variant="outlined"
                                                className={classes.modifier}
                                        />
                                </CardContent>
                        </Card>
                </div>
        );
}
