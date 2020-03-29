import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import AddPokemon from "../AddPokemon/AddPokemon";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Pokedex(props) {
  const classes = useStyles();
  const [trainersDex, setTrainersDex] = useState(props.pokedex);
  const [addPokemon, setAddPokemon] = useState(false);

  const handleCheck = (e, pokemon) => {
    const newTrainersDex = [...trainersDex];
    const index = newTrainersDex.indexOf(pokemon);
    if (index > -1) {
      const newDexEntry = newTrainersDex[index];
      newDexEntry[e.target.name] = e.target.checked;
      newTrainersDex[index] = newDexEntry;
      setTrainersDex(newTrainersDex);
    }
  };

  const handleUpdatePokedex = (value) => {
    const newTrainersDex = [...trainersDex];
    const newPokemon = {
      name: value,
      caught: false,
      seen: false,
    };
    newTrainersDex.push(newPokemon);
    setTrainersDex(newTrainersDex);
    props.add(newTrainersDex);
    setAddPokemon(!addPokemon);
  };

  const pokemonList = trainersDex.map((pokemon, key) => {
    return (
      <TableRow key={key}>
        <TableCell>
          <Checkbox
            defaultChecked={pokemon.caught}
            name="caught"
            onChange={(e) => {
              handleCheck(e, pokemon);
            }}
          />
        </TableCell>
        <TableCell>
          <Checkbox
            defaultChecked={pokemon.seen}
            name="seen"
            onChange={(e) => {
              handleCheck(e, pokemon);
            }}
          />
        </TableCell>
        <TableCell>{pokemon.name}</TableCell>
      </TableRow>
    );
  });

  const handleClickAdd = () => {
    setAddPokemon(!addPokemon);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Caught</TableCell>
                <TableCell>Seen</TableCell>
                <TableCell>Pokemon</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{pokemonList}</TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleClickAdd}>Add</Button>
        {addPokemon ? (
          <div>
            <AddPokemon update={handleUpdatePokedex} />
          </div>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
