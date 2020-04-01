import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

import PokemonDetails from './Details/PokemonDetails';
import AddPokemon from './AddPokemon/AddPokemon';
import Pokedex from './Pokedex/Pokedex';

import './Party.css';

export default function Party(props) {
  const [open, setOpen] = useState(false);
  const [addPokemon, setAddPokemon] = useState(false);
  const [pokedex, setPokedex] = useState(false);
  const [party, setParty] = useState([...props.party]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newPokemon, setNewPokemon] = useState('');

  useEffect(() => {
    setParty([...props.party]);
  }, [props.party]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPokemon = () => {
    setAddPokemon(true);
  };

  const handleClickOpenPokedex = () => {
    setPokedex(true);
  };

  const handleClose = () => {
    const newParty = [...party];
    newParty[selectedIndex] = selectedPokemon;
    props.update(newParty);
    setOpen(false);
  };

  const handleDiscard = () => {
    setOpen(false);
  };

  const handleClosePokedex = () => {
    setPokedex(false);
  };

  const handleAddPokemon = () => {
    props.add(newPokemon);
  };

  const handleNewPokemon = (name) => {
    setNewPokemon(name);
  };

  const handleDiscardPokemon = () => {
    setAddPokemon(false);
  };

  const seeDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSelectedIndex(party.indexOf(pokemon));
    handleClickOpen();
  };

  const deletePokemon = (pokemon) => {
    const newParty = [...party];
    const index = newParty.indexOf(pokemon);
    if (index > -1) {
      newParty.splice(index, 1);
    }
    setParty(newParty);
    props.update(newParty);
  };

  const handleUpdateInfo = (e) => {
    const updatedPokemon = { ...selectedPokemon };
    setSelectedPokemon({ ...updatedPokemon, [e.target.name]: e.target.value });
  };

  const handleUpdateStatus = (e) => {
    const updatedPokemon = { ...selectedPokemon };
    updatedPokemon.status[e.target.name] = e.target.checked;
    setSelectedPokemon(updatedPokemon);
  };

  const handleUpdateStats = (e) => {
    const updatedPokemon = { ...selectedPokemon };
    let value;
    if (e.target.value === '') {
      value = 0;
    } else {
      value = Number(e.target.value);
    }
    updatedPokemon.stats[e.target.name] = value;
    setSelectedPokemon(updatedPokemon);
  };

  const handleUpdateAbility = (ability) => {
    const updatedPokemon = { ...selectedPokemon };
    updatedPokemon.currentAbility = ability;
    setSelectedPokemon(updatedPokemon);
  };

  const pokemonList = party.map((pokemon, index) => (
    <Card key={index}>
      <CardContent className="party-card">
        <Typography variant="h5" className="pokemon-name">
          {pokemon.name}
        </Typography>
        <Typography variant="subtitle2" className="pokemon-level">
          Level
          {' '}
          {pokemon.level}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => seeDetails(pokemon)}
          className="btn-pokemon-details"
        >
          Details
        </Button>
        <Tooltip
          arrow
          title={(
            <>
              <Typography color="inherit">This cannot be undone!</Typography>
            </>
          )}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              deletePokemon(pokemon);
            }}
            className="btn-pokemon-remove"
          >
            Delete
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  ));

  return (
    <div className="party-container">
      <Button
        className="pokemon-button"
        variant="outlined"
        color="primary"
        disableElevation
        onClick={handleClickOpenPokemon}
      >
        Add Pokemon
      </Button>
      <Button
        className="pokemon-button"
        variant="outlined"
        color="primary"
        disableElevation
        onClick={handleClickOpenPokedex}
      >
        Pokedex
      </Button>
      <div className="pokemon-list-container">{pokemonList}</div>
      <Dialog open={open} onClose={handleDiscard} scroll="paper" className="dialog">
        <DialogTitle id="form-dialog-title">{selectedPokemon.name}</DialogTitle>
        <DialogContent>
          <PokemonDetails
            pokemon={selectedPokemon}
            update={handleUpdateInfo}
            updateStatus={handleUpdateStatus}
            updateStats={handleUpdateStats}
            updateAbility={handleUpdateAbility}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleDiscard} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addPokemon}
        onClose={handleDiscard}
        scroll="paper"
        className="add-dialog"
      >
        <DialogTitle>Add Pokemon</DialogTitle>
        <DialogContent>
          <AddPokemon update={handleNewPokemon} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAddPokemon} color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleDiscardPokemon} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={pokedex}
        onClose={handleClosePokedex}
        scroll="paper"
        className="add-dialog"
      >
        <DialogTitle>Pokedex</DialogTitle>
        <DialogContent>
          <Pokedex pokedex={props.pokedex} add={props.addPokedex} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.updatePokedex} color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleClosePokedex} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
