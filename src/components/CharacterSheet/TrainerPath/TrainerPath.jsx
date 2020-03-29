import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  trainerPathInteriorContainer: {
    marginTop: theme.spacing(1),
  },
  trainerPathInput: {
    minWidth: "100% !important",
  },
}));

export default function TrainerPath(props) {
  const classes = useStyles();
  const [textVariant, setTextVariant] = useState("outlined");
  const [inputProps, setInputProps] = useState({readOnly: false});

  useEffect(() => {
    if (!props.isEditable) {
      setTextVariant("outlined");
      setInputProps({readOnly: false});
    } else {
      setTextVariant("filled");
      setInputProps({readOnly: true});
    }
  }, [props.isEditable]);
  return (
    <div className={classes.trainerPathInteriorContainer}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">{props.type}</Typography>
          <Typography variant="subtitle2">Level {props.level}</Typography>
          <TextField
            className={classes.trainerPathInput}
            defaultValue={props.info}
            onChange={props.update}
            name={props.name}
            variant={textVariant}
            InputProps={inputProps}
          />
        </CardContent>
      </Card>
    </div>
  );
}
