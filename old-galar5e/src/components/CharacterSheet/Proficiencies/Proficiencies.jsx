import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Remove, Add } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';

import './Proficiencies.css';

export default function Proficiencies(props) {
  const [htmlProfs, setHtmlProfs] = useState();
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    if (!props.isEditable) {
      setClickable(false);
    } else {
      setClickable(true);
    }
    const listProfs = props.profs.map((prof) => {
      let bonus;
      if (prof.bonus > -1) {
        bonus = <Add fontSize="small" />;
      } else {
        bonus = <Remove fontSize="small" />;
      }

      const profId = `prof-${prof.name}`;
      return (
        <div key={prof.name} className="prof-container-minor">
          <FormControlLabel
            value="end"
            label={prof.name}
            labelPlacement="end"
            className="prof"
            control={
              <Checkbox
                defaultChecked={prof.prof}
                name={prof.name}
                disabled={clickable}
                onChange={(e) => {
                  const profIndex = props.profs.indexOf(prof);
                  props.profs[profIndex].prof = e.target.checked;
                  if (e.target.checked) {
                    props.profs[profIndex].bonus = props.profs[profIndex].bonus + props.profBonus;
                  } else {
                    props.profs[profIndex].bonus = props.profs[profIndex].bonus - props.profBonus;
                  }
                  props.update();
                }}
              />
            }
          />
          <Tooltip title="Calculated automatically">
            <TextField
              id={profId}
              value={Math.abs(prof.bonus)}
              className="prof-bonus"
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">{bonus}</InputAdornment>,
              }}
            />
          </Tooltip>
        </div>
      );
    });
    setHtmlProfs(listProfs);
  }, [props.profs, props.profBonus, props, clickable]);

  return (
    <Card variant="outlined" className="profs">
      <div className="prof-container-major">{htmlProfs}</div>
      <Typography variant="subtitle2" className="prof-title">
        {props.title}
      </Typography>
    </Card>
  );
}
