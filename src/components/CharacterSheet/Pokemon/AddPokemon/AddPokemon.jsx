import React, {useState, useEffect, useCallback} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Pokedex from "../../../../assets/pokedex.json";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function AddPokemon(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [monsterManual, setMonsterManual] = useState();

  const handleChangePokemon = (event, value) => {
    props.update(value);
  };

  const fetchData = useCallback(async () => {
    const pokedexArray = Pokedex;
    let renderedMonsterManual = [];

    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(pokedexArray)) {
      renderedMonsterManual.push(value);
    }
    setMonsterManual(renderedMonsterManual);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  } else {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.grid}>
          <Autocomplete
            id="combo-box-demo"
            options={monsterManual}
            onChange={handleChangePokemon}
            renderInput={(params) => (
              <TextField {...params} label="Search..." variant="outlined" fullWidth />
            )}
          />
        </CardContent>
      </Card>
    );
  }
}
