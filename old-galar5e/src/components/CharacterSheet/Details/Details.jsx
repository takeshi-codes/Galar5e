import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  detailsCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: theme.spacing(1),
  },
  detailsInteriorContainer: {
    marginTop: theme.spacing(1),
  },
  detailsInput: {
    minWidth: '100% !important',
  },
}));

export default function Details(props) {
  const classes = useStyles();
  const [textVariant, setTextVariant] = useState('outlined');
  const [inputProps, setInputProps] = useState({ readOnly: false });

  useEffect(() => {
    if (!props.isEditable) {
      setTextVariant('outlined');
      setInputProps({ readOnly: false });
    } else {
      setTextVariant('filled');
      setInputProps({ readOnly: true });
    }
  }, [props.isEditable]);

  return (
    <div className={classes.detailsInteriorContainer}>
      <Card variant="outlined">
        <CardContent className={classes.detailsCard}>
          <TextField
            label="Ideals"
            onChange={props.update}
            name="ideals"
            defaultValue={props.details.ideals}
            className={classes.detailsInput}
            variant={textVariant}
            InputProps={inputProps}
          />
          <TextField
            label="Battle Phrase"
            onChange={props.update}
            name="battlePhrase"
            defaultValue={props.details.battlePhrase}
            className={classes.detailsInput}
            variant={textVariant}
            InputProps={inputProps}
          />
          <TextField
            label="Flaws"
            onChange={props.update}
            name="flaws"
            defaultValue={props.details.flaws}
            className={classes.detailsInput}
            variant={textVariant}
            InputProps={inputProps}
          />
        </CardContent>
      </Card>
    </div>
  );
}
