import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

import './Basics.css'

export default function Basics(props) {
  const [textVariant, setTextVariant] = useState('standard');
  const [inputProps, setInputProps] = useState({ readOnly: false });
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    if (!props.isEditable) {
      setTextVariant('standard');
      setInputProps({ readOnly: false });
      setClickable(false)
    } else {
      setTextVariant('filled');
      setInputProps({ readOnly: true });
      setClickable(true)
    }
  }, [props.isEditable])

  return (
    <div className='basics-container-interior'>
      <Card variant='outlined' className='curent-hp-card'>     
          <TextField 
            label='Current HP'
            defaultValue={props.basics.currentHp}
            onChange={props.update} 
            type='number'
            name='currentHp'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='max-hp-card'>     
          <TextField 
            label='Max HP'
            defaultValue={props.basics.maxHp}
            type='number'
            onChange={props.update} 
            name='maxHp'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='armor-class-card'>     
          <TextField 
            label='AC'
            type='number'
            defaultValue={props.basics.ac}
            onChange={props.update} 
            name='ac'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='walking-card'>     
          <TextField 
            label='Walking Speed'
            type='number'
            defaultValue={props.basics.walkingSpeed}
            onChange={props.update} 
            name='walkingSpeed'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='hit-dice-card'>     
          <TextField 
            label='Hit Dice'
            defaultValue={props.basics.hitDice}
            onChange={props.update} 
            name='hitDice'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='initiative-card'>     
          <TextField 
            label='Initiative'
            type='number'
            defaultValue={props.basics.initiative}
            onChange={props.update} 
            name='initiative'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='perception-card'> 
          <Tooltip title="Passive perception is calculated automatically">   
            <TextField 
              label='Perception'
              defaultValue={props.passives.perception}
              variant={textVariant}
              InputProps={{
                readOnly: true,
              }}
            />
          </Tooltip>
        </Card>
        <Card variant='outlined' className='investigation-card'> 
          <Tooltip title="Passive investigation is calculated automatically">    
            <TextField 
              label='Investigation'
              defaultValue={props.passives.investigation}
              variant={textVariant}
              InputProps={{
                readOnly: true,
              }}
            />
          </Tooltip>
        </Card>
        <Card variant='outlined' className='insight-card'>     
          <Tooltip title="Passive insight is calculated automatically">
            <TextField 
              label='Insight'
              defaultValue={props.passives.insight}
              variant={textVariant}
              InputProps={{
                readOnly: true,
              }}
            />
          </Tooltip>
        </Card>
        <Card variant='outlined' className='prof-bonus-card'>     
          <TextField 
            label='Proficiency'
            defaultValue={props.basics.proficiency}
            type='number'
            onChange={props.update} 
            name='proficiency'
            variant={textVariant}
            InputProps={inputProps}
          />
        </Card>
        <Card variant='outlined' className='inspiration-card'>     
          <FormControlLabel
            value='end'
            control={
                <Checkbox 
                  defaultChecked={props.basics.inspiration}
                  name='inspiration' 
                  onChange={props.update}
                  disabled={clickable}
                />
              }
            label='Inspiration'
            labelPlacement='end'
            className='inspiration-input'
          />
        </Card>
    </div>
  );
}
