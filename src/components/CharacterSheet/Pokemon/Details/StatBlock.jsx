import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  statInterior: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(2, 1fr)', 
  },  
  modifier: {
    maxWidth: '60%',
    margin: '0 auto',
  }
}));

export default function StatBlock(props) {
  const classes = useStyles();
  const [modifier, setModifier] = useState(0);
  const [save, setSave] = useState(0);

  const updateMod = useCallback(() => {
    let stat = parseInt(props.statNum);
    let mod = modifier;
    if (stat < 8) {
      mod = "-2";
    } else if (stat === 8 || stat === 9){
      mod = "-1";
    } else if (stat === 10 || stat === 11){
      mod = "0";
    } else if (stat === 12 || stat === 13){
      mod = "+1";
    } else if (stat === 14 || stat === 15){
      mod = "+2";
    } else if (stat === 16 || stat === 17){
      mod = "+3";
    } else if (stat === 18 || stat === 19){
      mod = "+4";
    } else if (stat === 20){
      mod = "+5";
    };
    setModifier(mod);

    let bonus;
    if (props.saves.includes(props.statName)){
      bonus = (parseInt(mod)) + props.profBonus
    } else {
      bonus = (parseInt(mod))
    }

    setSave(bonus)

  },[modifier, props.profBonus, props.statName, props.statNum, props.saves]);

  useEffect(() => {
    updateMod();
  }, [updateMod])

  return (
    <div>
      <Card variant="outlined">
      <CardContent className={classes.statInterior}>
        <TextField  
          onChange={props.update} 
          name={props.statName} 
          label={props.statName} 
          type="number"
          defaultValue={props.statNum} />
        <Typography className={classes.modifier}>{modifier}</Typography>
        <TextField
          label="Save" 
          type="number"
          InputProps={{
            readOnly: true,
          }}
          value={save} />
      </CardContent>
    </Card>
    </div>
  );
}
