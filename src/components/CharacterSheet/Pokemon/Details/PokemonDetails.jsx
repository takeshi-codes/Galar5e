import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';

import { API } from "aws-amplify";

import urls from '../../../../utils/urls';
import LevelTable from '../../../../assets/levelTable.json';
import NaturesTable from '../../../../assets/natures.json';
import TmTable from '../../../../assets/tms.json';

import '../Party.css';
import StatBlock from './StatBlock';

const useStyles = makeStyles(theme => ({
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridGap: theme.spacing(2) 
  },
  card:{
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridGap: theme.spacing(2),
  },
  twoCardContainer:{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: theme.spacing(1) 
  },
  input:{
  },
  attackPanel: {
    minWidth: '100%',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  attackLabel: {
    fontSize: '1.25rem',
    marginLeft: theme.spacing(1)
  },
  addAttack: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.spacing(2),
  }
}));

export default function PokemonDetails(props) {  
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(props.pokemon);
  const [profBonus, setProfBonus] = useState(0);
  const [stab, setStab] = useState(0);
  const [ability, setAbility] = useState('');
  const [abilityList, setAbilityList] = useState([]);
  const [natures] = useState(NaturesTable);
  const [attackDetails, setAttackDetails] = useState();
  const [attackLoading, setAttackLoading] = useState(true);
  const [expanded, setExpanded] = useState();
  const [addLearnType, setAddLearnType] = useState(false);
  const [addMoves, setAddMoves] = useState(false);
  const [attackList, setAttackList] = useState([]);
  const [learnType, setLearnType] = useState('');
  const [newAttack, setNewAttack] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const inputLabel = React.useRef(null);

  const fetchData = useCallback(async (ability) => {
    let apiName = urls.monstermanual;
    let abilityPath = urls.getAbility + ability;
    const apiAbility = await API.get(apiName, abilityPath);
    setAbility(apiAbility.Ability.ABILITY_DESC);
    setLoading(false);
  }, []);

  const renderedNatures = (
    natures.map((nature, index) => (
      <MenuItem value={nature.name} key={index}>{nature.name}</MenuItem>
    ))
  );

  const getTmMoves = () => {
    const tmArray = pokemon.moves.tm.map((tm) => { return(TmTable[tm]) });
    const currentAttacks = [];

    for (let key of Object.keys(pokemon.moves.current)) {
      currentAttacks.push(pokemon.moves.current[key].name)
    }

    for (let key of Object.keys(currentAttacks)) {
      if (tmArray.includes(currentAttacks[key])){
        tmArray.splice(tmArray.indexOf(currentAttacks[key]), 1);
      }
    }
    
    const movesArray = tmArray.map((tm, index) => {
      return(
        <MenuItem value={tm} key={index}>{tm}</MenuItem>
      )
    });
    setAttackList(movesArray);
  }

  const getLevelMoves = () => {
    const attackNamesArray = [];
    const currentAttacks = [];

    for (let key of Object.keys(pokemon.moves.current)) {
      currentAttacks.push(pokemon.moves.current[key].name)
    }

    for (let key of Object.keys(pokemon.moves.level)) {
      attackNamesArray.push(pokemon.moves.level[key])
    }

    for (let key of Object.keys(pokemon.moves.startingMoves)) {
      attackNamesArray.push(pokemon.moves.startingMoves[key])
    }

    const mergedNames = attackNamesArray.flat(1);

    for (let key of Object.keys(currentAttacks)) {
      if (mergedNames.includes(currentAttacks[key])){
        mergedNames.splice(mergedNames.indexOf(currentAttacks[key]), 1);
      }
    }

    mergedNames.forEach((move, index, namesArray) => {
      namesArray[index] = move.replace('-', ' ');
    });

    const movesArray = mergedNames.map((attack, index) => {
      return(
        <MenuItem value={attack} key={index}>{attack}</MenuItem>
      )
    });
    setAttackList(movesArray);
  }

  const fetchAttackData = useCallback(async (expanded, move, index) => {
    if (expanded === true){
      setAttackLoading(true);
      setExpanded(index)
      let apiName = urls.monstermanual;
      let attackPath = urls.getMove + move.name;
      const apiAttack = await API.get(apiName, attackPath);
      setAttackDetails(apiAttack.Move);
      setAttackLoading(false);
    } else {
      setExpanded('')
    }
  }, [])

  const handleUpdateMove = (e,move) => {
    const newPokemon = {...pokemon}
    const attacks = newPokemon.moves.current;
    const attackIndex = attacks.indexOf(move);
    if (attackIndex > -1){
      attacks[attackIndex] = {
        name: move.name,
        pp: e.target.value
      };
    }    
    newPokemon.moves.current = attacks;
    setPokemon(newPokemon);
  }

  const deleteMove = (move) => {
    setLoading(true);
    const newPokemon = {...pokemon}
    const attacks = newPokemon.moves.current;
    const attackIndex = attacks.indexOf(move);
    if (attackIndex > -1) {
      attacks.splice(attackIndex, 1);
    }
    newPokemon.moves.current = attacks;
    setPokemon(newPokemon);
  }

  const renderedAttacks = (
    pokemon.moves.current.map((move, index) => (
      <ExpansionPanel 
        className={classes.card} 
        key={index}
        expanded = {expanded === index}
        onChange={(event, expanded) => {fetchAttackData(expanded, move, index)}}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}          
        >
          <Typography>{move.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          { attackLoading ? 
            (
              <CircularProgress color="secondary"/>
            ) : 
            (
              <div className={classes.attackPanel}>
                <div className={classes.details}>
                  <TextField 
                    label="Current PP"
                    type="number"
                    name='pp'
                    onChange={(e) => handleUpdateMove(e, move)}
                    defaultValue={move.pp}
                  />
                  <TextField 
                    label="Max PP"
                    defaultValue={attackDetails.PP}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField 
                    label="Move Type"
                    defaultValue={attackDetails.MOVE_TYPE}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField 
                    label="Move Time"
                    defaultValue={attackDetails.MOVE_TIME}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField 
                    label="Duration"
                    defaultValue={attackDetails.DURATION}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField 
                    label="Range"
                    defaultValue={attackDetails.RANGE}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField 
                    label="Move Power"
                    defaultValue={attackDetails.MOVE_POWER}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <Typography variant="body2" className={classes.attackLabel}>
                  {attackDetails.DESCRIPTION}
                </Typography>
                { move.name !== 'Struggle' ? (               
                  <Tooltip
                    arrow
                    title={
                      <React.Fragment>
                        <Typography color="inherit">This cannot be undone!</Typography>
                      </React.Fragment>
                    }
                  >
                    <Button 
                      variant='contained' 
                      disableElevation 
                      onClick={(() => {deleteMove(move)})}
                    >
                        Delete
                    </Button>
                  </Tooltip>
                ): (
                  <></>
                )
                  }
              </div>
            )
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))
  );

  const handleLearnType = (e) => {
    if (e.target.value === "tm"){
      setAddMoves(true);
      setLearnType(e.target.value);
      getTmMoves();
    }
    if (e.target.value === "level"){      
      setAddMoves(true);
      setLearnType(e.target.value);
      getLevelMoves();
    }
  }

  const handleAddAttack = async (e) => {
    setLoading(true);
    setNewAttack(e.target.value);

    let apiName = urls.monstermanual;
    let attackPath = urls.getMove + e.target.value;
    const apiAttack = await API.get(apiName, attackPath);
    const newMove = {
      name: apiAttack.Move.MOVE_NAME,
      pp: apiAttack.Move.PP
    }
    
    const newPokemon = {...pokemon}
    const attacks = newPokemon.moves.current;
    attacks.push(newMove);
    newPokemon.moves.current = attacks;
    setPokemon(newPokemon);
    setAddMoves(false);
    setAddLearnType(false);
    setLearnType('');
    setNewAttack('');
    setExpanded('');
  }

  const renderLearnType = addLearnType ? 
    (
      <FormControl>
        <InputLabel>
          Learn Type
        </InputLabel>
        <Select
          name="Learn Type"
          value={learnType}
          onChange={handleLearnType}
        >
          <MenuItem value="tm">TM</MenuItem>
          <MenuItem value="level">Level</MenuItem>
        </Select>
      </FormControl>
    ) : 
    (
      <></>
    );

  const renderAddMove = addMoves ? 
  (
    <FormControl>
      <InputLabel>
        Attack
      </InputLabel>
      <Select
        name="Attack"
        value={newAttack}
        onChange={handleAddAttack}
      >
        { attackList }
      </Select>
    </FormControl>
  ) : 
  (
    <></>
  );

  const handleAddClick = () => {
    setAddLearnType(!addLearnType)
    setAddMoves(false);
  }

  const calculateBonuses = useCallback((level) => {
    setProfBonus(LevelTable[level].prof);
    setStab(LevelTable[level].STAB);
  }, [])

  const proficiencies = (
    props.pokemon.proficiencies.map((proficiency, index) => (
      <Typography key={index}>
        {proficiency}
      </Typography>
    ))
  );

  const handleOpenAbility = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAbilityClose = () => {
    setAnchorEl(null);
  };

  const handleChangeAbility = (event, index) =>{
    fetchData(abilityList[index])
    props.updateAbility(abilityList[index])
    setAnchorEl(null);
  }

  const createAbilityList = useCallback(() => {
    const newAbilityList = props.pokemon.abilities.map((ability) => ability);
    if (props.pokemon.hiddenAbility !== undefined){
      newAbilityList.push(props.pokemon.hiddenAbility)
    }
    setAbilityList(newAbilityList);
  }, [props.pokemon.abilities, props.pokemon.hiddenAbility]);

  const abilityMenu = (
    abilityList.map((ability, index) => (
      <MenuItem 
        onClick={(event) => handleChangeAbility(event, index)} 
        key={index}
      >
        {ability}
      </MenuItem>
    ))
  );

  const prependStruggle = useCallback(() => {
    if (pokemon.moves.current[0].name !== 'Struggle'){
      pokemon.moves.current.unshift({
        name: 'Struggle',
        pp: 0
      });
    }

  }, [pokemon.moves]);

  useEffect(() => {
    setPokemon(props.pokemon);
    calculateBonuses(props.pokemon.level);
    createAbilityList();
    fetchData(props.pokemon.currentAbility);
    prependStruggle();
  }, [pokemon, natures, props.pokemon, calculateBonuses, createAbilityList, fetchData, prependStruggle]);

  if (loading) {
    return (
      <CircularProgress color="secondary"/>  
    );
  } else {
    return(
      <Card>
        <CardContent>
          <div className={classes.header}>
            <TextField    
              label="Nickname" 
              name="nickname"
              className={classes.input}
              defaultValue={pokemon.nickname}
              onChange={props.update}
              variant='outlined'  
            />
            <FormControl variant='outlined'>
              <InputLabel id='nature-label' ref={inputLabel}>
                Nature
              </InputLabel>
              <Select
                labelId='nature-label'
                defaultValue={pokemon.nature}
                name="nature"
                onChange={props.update}
                displayEmpty
              >
                {renderedNatures}
              </Select>
            </FormControl>
            <TextField    
              label="Level" 
              type="number"
              name="level"
              className={classes.input}
              defaultValue={pokemon.level}
              onChange={props.update}  />
            <TextField    
              label="Exp"
              type="Number"
              name="exp"
              value={pokemon.exp}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="AC" 
              type="number"
              name="armorClass"
              value={pokemon.armorClass}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="HP" 
              type="number"
              name="currentHp"
              value={pokemon.currentHp}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="Max HP" 
              type="number"
              name="maxHp"
              value={pokemon.maxHp}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="Hit Dice"
              name="hitDice" 
              value={pokemon.hitDice}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="Loyalty"
              name="loyalty" 
              type="number"
              value={pokemon.loyalty}
              className={classes.input}
              onChange={props.update} />
            <TextField    
              label="Proficiency Bonus" 
              type="number"
              value={profBonus}
              className={classes.input}
              InputProps={{
                readOnly: true,
              }} />
            <TextField    
              label="STAB" 
              type="number"
              value={stab}
              className={classes.input}
              InputProps={{
                readOnly: true,
              }} />
          </div>
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.label}>
              Stats
            </Typography>
            <CardContent className={classes.stats}>
              <StatBlock statName="STR" statNum={pokemon.stats.STR} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
              <StatBlock statName="DEX" statNum={pokemon.stats.DEX} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
              <StatBlock statName="CON" statNum={pokemon.stats.CON} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
              <StatBlock statName="WIS" statNum={pokemon.stats.WIS} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
              <StatBlock statName="INT" statNum={pokemon.stats.INT} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
              <StatBlock statName="CHA" statNum={pokemon.stats.CHA} update={props.updateStats} saves={pokemon.savingThrows} profBonus={profBonus}/>
            </CardContent>
          </Card>
          <div className={classes.twoCardContainer}>
            <Card className={classes.card}>
              <CardContent>
              <Typography variant="h6" >
                Proficiencies:
              </Typography>
              {proficiencies}
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" >
                  Ability:
                </Typography>
                <Tooltip
                  arrow
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{ability}</Typography>
                    </React.Fragment>
                  }
                >
                <Button onClick={handleOpenAbility}>{pokemon.currentAbility}</Button>
                </Tooltip>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleAbilityClose}
                >
                  {abilityMenu}
                </Menu>
              </CardContent>
            </Card>
          </div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" >
                Status Conditions:
              </Typography>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.burned}
                    name="burned" 
                    onChange={props.updateStatus}
                  />
                }
                label="Burned"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.poisoned}
                    name="poisoned" 
                    onChange={props.updateStatus}
                  />
                }
                label="Poisoned"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.frozed}
                    name="frozen" 
                    onChange={props.updateStatus}
                  />
                }
                label="Frozen"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.paralyzed}
                    name="paralyzed" 
                    onChange={props.updateStatus}
                  />
                }
                label="Paralyzed"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.asleep}
                    name="asleep" 
                    onChange={props.updateStatus}
                  />
                }
                label="Asleep"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.confused}
                    name="confused" 
                    onChange={props.updateStatus}
                  />
                }
                label="Confused"
                labelPlacement="end"
                className={classes.status}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox 
                    defaultChecked={pokemon.status.flinched}
                    name="flinched" 
                    onChange={props.updateStatus}
                  />
                }
                label="Flinched"
                labelPlacement="end"
                className={classes.status}
              />
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" >
                Attacks:
              </Typography>
              <div className={classes.attacks}>
                {renderedAttacks}
              </div>
              <div className={classes.addAttack}>
                <Button
                  className='pokemon-button'
                  variant='outlined' 
                  color='primary' 
                  disableElevation 
                  onClick={handleAddClick}
                  disabled={pokemon.moves.current.length >= 5}
                >
                  Add Move                
                </Button>
                {renderLearnType}
                {renderAddMove}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}