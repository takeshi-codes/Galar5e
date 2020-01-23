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

  const [trainerInfo, setTrainerInfo] = useState(props.info);
  const [textVariant, setTextVariant] = useState('outlined');
  const [inputProps, setInputProps] = useState({ readOnly: false });

  const handleUpdateInfo = e => {
    const updatedTrainer = {...trainerInfo};    
    updatedTrainer[e.target.name] = e.target.value;
    setTrainerInfo(updatedTrainer);
    props.update(updatedTrainer);
  }

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
          onChange={handleUpdateInfo} 
          name='name'
          defaultValue={trainerInfo.name}
          className={classes.infoInput}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          label="Level"
          type="number"
          onChange={handleUpdateInfo} 
          name='level'
          defaultValue={trainerInfo.level}
          className={classes.infoInput}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput} 
          label="Class"
          onChange={handleUpdateInfo} 
          name='class'
          defaultValue={trainerInfo.class} 
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput}  
          label="Background"
          onChange={handleUpdateInfo} 
          name='background'
          defaultValue={trainerInfo.background}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          className={classes.infoInput} 
          label="Player Name"
          defaultValue={trainerInfo.username} 
          onChange={handleUpdateInfo} 
          name='username'
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField 
          className={classes.infoInput} 
          label="Race"
          onChange={handleUpdateInfo} 
          name='race'
          defaultValue={trainerInfo.race}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField  
          className={classes.infoInput} 
          label="Alignment"
          onChange={handleUpdateInfo} 
          name='alignment'
          defaultValue={trainerInfo.alignment}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className={classes.infoInput}  
          label="EXP"
          type="number"
          onChange={handleUpdateInfo} 
          name='exp'
          defaultValue={trainerInfo.exp}
          variant={textVariant}
          InputProps={inputProps}
        />
        <TextField
          className="money-input"  
          label="Money"
          type="number"
          onChange={handleUpdateInfo} 
          name='money'
          defaultValue={trainerInfo.money}
          variant={textVariant}
          InputProps={inputProps}
        />
      </CardContent>        
    </Card>
  );
  
}

