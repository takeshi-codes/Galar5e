import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  characterInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateTows: 'repeat(3, 1fr)',
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(2),
  },
  infoInput: {
    minWidth: '100% !important'
  },
}));

export default function CharacterInfo(props) {
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
  }, [props.isEditable])

  return (
    <Card variant="outlined">
      <CardContent className={classes.characterInfo} >
        <TextField 
          label="Character Name"
          onChange={props.update} 
          name='name'
          defaultValue={props.info.name}
          className={classes.infoInput}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          label="Level"
          type="number"
          onChange={props.update} 
          name='level'
          defaultValue={props.info.level}
          className={classes.infoInput}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput} 
          label="Class"
          onChange={props.update} 
          name='class'
          defaultValue={props.info.class} 
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput}  
          label="Background"
          onChange={props.update} 
          name='background'
          defaultValue={props.info.background}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          className={classes.infoInput} 
          label="Player Name"
          defaultValue={props.info.username} 
          onChange={props.update} 
          name='username'
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          className={classes.infoInput} 
          label="Race"
          onChange={props.update} 
          name='race'
          defaultValue={props.info.race}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField  
          className={classes.infoInput} 
          label="Alignment"
          onChange={props.update} 
          name='alignment'
          defaultValue={props.info.alignment}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput}  
          label="EXP"
          type="number"
          onChange={props.update} 
          name='exp'
          defaultValue={props.info.exp}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className="money-input"  
          label="Money"
          type="number"
          onChange={props.update} 
          name='money'
          defaultValue={props.info.money}
          variant={textVariant}
          InputProps={inputProps}
        />
      </CardContent>        
    </Card>
  );
  
}

