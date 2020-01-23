import React, { useState, useEffect, useCallback }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { API } from "aws-amplify";

import urls from '../../utils/urls';

import StatBlock from '../../components/CharacterSheet/StatBlock/StatBlock';
import CharacterInfo from '../../components/CharacterSheet/CharacterInfo/CharacterInfo';
import Proficiencies from '../../components/CharacterSheet/Proficiencies/Proficiencies';
import Basics from '../../components/CharacterSheet/Basics/Basics';
import TrainerPath from '../../components/CharacterSheet/TrainerPath/TrainerPath';
import Details from '../../components/CharacterSheet/Details/Details';
import Inventory from '../../components/CharacterSheet/Inventory/Inventory';
import ToolProfs from '../../components/CharacterSheet/ToolProfs/ToolProfs';
import Party from '../../components/CharacterSheet/Pokemon/Party';
import './CharacterSheet.css';
import EmptySheet from '../../assets/trainer';

export default function CharacterSheet(props) {
  
  const history = useHistory();
  const [isNew, setIsNew] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [drawerLoading, setDrawerLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [pokemon, setPokemon] = useState(false);
  const [tools, setTools] = useState(false);
  const [trainer, setTrainer] = useState({});
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [party, setParty] = useState({});
  const [pokedex, setPokedex] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [passives, setPassives] = useState({
    perception: 0,
    investigation: 0,
    insight: 0
  });

  const calculateBonuses = useCallback((trainer) => {
    let updatedTrainer = {...trainer};
    let newSavingThrows = updatedTrainer.savingThrows;
    let newSkills = updatedTrainer.skills;
    newSavingThrows.forEach((savingThrow) =>{
      if (savingThrow.name === "STR"){
        savingThrow.bonus = getMod(trainer.stats.STR)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
      if (savingThrow.name === "CON"){
        savingThrow.bonus = getMod(trainer.stats.CON)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
      if (savingThrow.name === "DEX"){
        savingThrow.bonus = getMod(trainer.stats.DEX)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
      if (savingThrow.name === "INT"){
        savingThrow.bonus = getMod(trainer.stats.INT)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
      if (savingThrow.name === "WIS"){
        savingThrow.bonus = getMod(trainer.stats.WIS)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
      if (savingThrow.name === "CHA"){
        savingThrow.bonus = getMod(trainer.stats.CHA)
        if (savingThrow.prof === true){
          savingThrow.bonus = savingThrow.bonus + trainer.basics.proficiency
        }
      }
    });

    newSkills.forEach((skill) => {
      if (skill.name === "Acrobatics"){
        skill.bonus = getMod(trainer.stats.DEX)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Animal Handling"){
        skill.bonus = getMod(trainer.stats.WIS)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Arcana"){
        skill.bonus = getMod(trainer.stats.INT)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Athletics"){
        skill.bonus = getMod(trainer.stats.STR)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Deception"){
        skill.bonus = getMod(trainer.stats.CHA)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "History"){
        skill.bonus = getMod(trainer.stats.INT)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Insight"){
        skill.bonus = getMod(trainer.stats.WIS)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Intimidation"){
        skill.bonus = getMod(trainer.stats.CHA)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Investigation"){
        skill.bonus = getMod(trainer.stats.INT)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Medicine"){
        skill.bonus = getMod(trainer.stats.WIS)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Nature"){
        skill.bonus = getMod(trainer.stats.INT)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Perception"){
        skill.bonus = getMod(trainer.stats.WIS)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Performance"){
        skill.bonus = getMod(trainer.stats.CHA)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Persuasion"){
        skill.bonus = getMod(trainer.stats.CHA)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Religion"){
        skill.bonus = getMod(trainer.stats.STR)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Sleight of Hand"){
        skill.bonus = getMod(trainer.stats.DEX)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Stealth"){
        skill.bonus = getMod(trainer.stats.DEX)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
      if (skill.name === "Survival"){
        skill.bonus = getMod(trainer.stats.WIS)
        if (skill.prof === true){
          skill.bonus = skill.bonus + trainer.basics.proficiency
        }
      }
    })
    updatedTrainer.savingThrows = newSavingThrows;
    updatedTrainer.skills = newSkills;
    setTrainer(updatedTrainer);
  },[])

  const fetchData = useCallback(async () => {
    if (props.location.pathname === "/create-trainer"){
      setIsEditable(true);
      setIsNew(true);
      const newTrainer = EmptySheet.character;
      setTrainer(newTrainer);
      calculateBonuses(newTrainer);
      setLoading(false);
      setCurrentUser(props.currentUser);
    } else {
      const apiName = urls.name;
      const path = urls.get + props.match.params.id;
      const options = {
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
      }
      const newTrainer = await API.get(apiName, path, options);
      setTrainer(newTrainer.character);
      getPassives(newTrainer.character);
      calculateBonuses(newTrainer.character);
      setLoading(false);
      setCurrentUser(props.currentUser);
    }
    
  }, [
    calculateBonuses, 
    props.match.params.id, 
    props.location.pathname, 
    props.currentUser
  ]);

  const fetchPokemon = useCallback(async () => {
    if (isNew === true){

    } else {
      const apiName = urls.name;
      const pokemonPath = urls.getParty + props.match.params.id;
      const options = {
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
      }
      const trainerParty = await API.get(apiName, pokemonPath, options);
      setParty(trainerParty.party);
      setDrawerLoading(false);
    }
  }, [isNew, props.match.params.id, props.currentUser.signInUserSession.idToken.jwtToken])

  const fetchPokedex = useCallback(async () => {
    if (isNew === true){

    } else {
      const apiName = urls.name;
      const pokedexPath = urls.getPokedex + props.match.params.id;
      const options = {
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
      }
      const apiPokedex = await API.get(apiName, pokedexPath, options);
      setPokedex(apiPokedex.pokedex);
    }
  }, [isNew, props.match.params.id, props.currentUser.signInUserSession.idToken.jwtToken])

  useEffect(() => {
    if(loading){
      fetchData();
    }    
  }, [loading, fetchData]);

  const getPassives = (trainer) => {
    let newPassives = {};
    let perception = trainer.skills.filter(skill => {
      return skill.name === "Perception"
    });
    perception = 10 + perception[0].bonus;
    newPassives.perception = perception;

    let investigation = trainer.skills.filter(skill => {
      return skill.name === "Investigation"
    });
    investigation = 10 + investigation[0].bonus;
    newPassives.investigation = investigation;

    let insight = trainer.skills.filter(skill => {
      return skill.name === "Insight"
    });
    insight = 10 + insight[0].bonus;
    newPassives.insight = insight;
    
    setPassives(newPassives);
  }

  const getMod = (stat) => {
    let mod = 0;
    if (stat < 8) {
      mod = -2;
    } else if (stat === 8 || stat === 9){
      mod = -1;
    } else if (stat === 10 || stat === 11){
      mod = 0;
    } else if (stat === 12 || stat === 13){
      mod = 1;
    } else if (stat === 14 || stat === 15){
      mod = 2;
    } else if (stat === 16 || stat === 17){
      mod = 3;
    } else if (stat === 18 || stat === 19){
      mod = 4;
    } else if (stat === 20){
      mod = 5;
    };
    return mod;
  };

  const handleClickEdit = () => {
    setIsEditable(true);
  }

  const updateButtons = () => {
    return(
      <>
        {isEditable ? (
          <Button variant="outlined" color="primary" disableElevation onClick={updateTrainer}>
            Save Changes
          </Button>
        ) : (
          <Button variant="outlined" color="primary" disableElevation onClick={handleClickEdit}>
            Edit Trainer
          </Button>
        )}
        <Button variant="outlined" color="primary" disableElevation onClick={(e) => toggleDrawer(e,"inventory",true)}>
          Inventory
        </Button>
        <Button variant="outlined" color="primary" disableElevation onClick={(e) => toggleDrawer(e,"pokemon",true)}>
          Pokemon
        </Button>
        <Button variant="outlined" color="primary" disableElevation onClick={(e) => toggleDrawer(e,"tools",true)}>
          Tool Proficiencies
        </Button>
        <Tooltip title="This will discard all unsaved changes">
          <Button variant="outlined" 
            disableElevation
            component={Link} 
            to={'/my-trainers'}>
            Exit
          </Button>
        </Tooltip>
      </>
    );
  }

  const newButtons = () => {
    return(
      <>
        <Button variant="outlined" color="primary" disableElevation onClick={createTrainer}>
          Create Trainer
        </Button>
        <Button variant="outlined" color="primary" disableElevation onClick={(e) => toggleDrawer(e,"tools",true)}>
          Tool Proficiencies
        </Button>
        <Tooltip title="This will discard all unsaved changes">
          <Button variant="outlined" 
            disableElevation
            component={Link} 
            to={'/my-trainers'}>
            Exit
          </Button>
        </Tooltip>
      </>
    );
  }

  const toggleDrawer = (event, drawer, status) => {
    if(drawer === "inventory"){
      setInventory(status)
    }
    if(drawer === "pokemon"){
      if (status === true){
        setPokemon(status);
        fetchPokemon();
        fetchPokedex();
      } else {
        setPokemon(status);
      }
    }
    if(drawer === "tools"){
      setTools(status)
    }
  }

  const updateTrainer = async () => {
    setUpdating(true);
    const updatedTrainer = {...trainer};
    if (trainerInfo !== null){
      updatedTrainer.info = trainerInfo;
    }
    if (trainerDetails !== null){
      updatedTrainer.details = trainerDetails;
    } 
    let apiName = urls.name; 
    let path = urls.update;
    let apiBody = {
        body: {
          character: updatedTrainer
        },
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
    };
   await API.put(apiName, path, apiBody)
      .then(response => {
        setTrainer(response.character);
        getPassives(response.character);
        setUpdating(false);
      })
      .catch(error => {
        console.log(error)
      });
  }

  const createTrainer = async () => {
    setUpdating(true);
    const newTrainer = trainer;
    newTrainer.userid = props.currentUser.username
    setTrainer(newTrainer)
    const apiName = urls.name; 
    const path = urls.create;
    const partyPath = urls.createParty;
    const pokedexPath = urls.createPokedex;
    const apiBody = {
        body: {
          character: trainer
        },
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
    };
    await API.post(apiName, path, apiBody)
      .then(async (response) => {
        const trainerInfo = {
          id: response.character.id,
          userid: response.character.userid,
        };
        const newParty = {
          party: [],
          userid: trainerInfo.userid,
          trainerid: trainerInfo.id,
        };

        const newPokedex = {
          pokedex: [],
          userid: trainerInfo.userid,
          trainerid: trainerInfo.id,
        };

        const partyApiBody = {
          body: {
            party: newParty,
          },
          headers: {
            Authorization: props.currentUser.signInUserSession.idToken.jwtToken
          }
        };

        const pokedexApiBody = {
          body: {
            pokedex: newPokedex,
          },
          headers: {
            Authorization: props.currentUser.signInUserSession.idToken.jwtToken
          }
        };
        await API.post(apiName, partyPath, partyApiBody)
          .then(async () => {
            await API.post(apiName, pokedexPath, pokedexApiBody)
              .then(() => {
                history.push("/trainer-sheet/" + trainerInfo.id) 
              })
              .catch(error => { console.log(error) });
          })
          .catch(error => { console.log(error) });
      }).catch(error => { console.log(error) });
  }

  const removeItem = (item) => {
    const updatedTrainer = trainer;
    const index = updatedTrainer.inventory.indexOf(item);
    if (index > -1) {
      updatedTrainer.inventory.splice(index, 1);
    }
    setTrainer(updatedTrainer);
    setInventory(false);
  }

  const removeProf = (prof) => {
    const updatedTrainer = trainer;
    const index = updatedTrainer.toolProf.indexOf(prof);
    if (index > -1) {
      updatedTrainer.toolProf.splice(index, 1);
    }
    setTrainer(updatedTrainer);
    setTools(false);
  }

  const handleUpdateInfo = trainerInfo => {
    setTrainerInfo(trainerInfo);
  }

  const handleUpdateDetails = trainerDetails => {
    setTrainerDetails(trainerDetails);
  }

  const handleUpdateStats = e => {
    const updatedTrainer = {...trainer};
    let value;
    if (e.target.value === ''){
      value = 0
    } else {
      value = parseInt(e.target.value)
    }
    updatedTrainer.stats[e.target.name] = value;
    setTrainer(updatedTrainer);
    calculateBonuses(updatedTrainer)
    getPassives(updatedTrainer)
  }

  const handleUpdateProfs = () => {
    const updatedTrainer = {...trainer};
    setTrainer(updatedTrainer);    
    getPassives(updatedTrainer);
  }

  const handleUpdateBasics = e => {
    const updatedTrainer = {...trainer};
    if(e.target.name !== 'inspiration'){
      if (e.target.name !== 'hitDice'){
        updatedTrainer.basics[e.target.name] = parseInt(e.target.value);
      } else {
        updatedTrainer.basics[e.target.name] = e.target.value;
      } 
    } else {
      updatedTrainer.basics[e.target.name] = e.target.checked;
    }
    setTrainer(updatedTrainer);
    if (e.target.name === 'proficiency'){
      calculateBonuses(updatedTrainer)
      getPassives(updatedTrainer)
    }
  }

  const handleUpdateTrainerPath = e => {
    const updatedTrainer = {...trainer};    
    updatedTrainer.trainerPaths[e.target.name] = e.target.value;
    setTrainer(updatedTrainer);
  }

  const handleUpdateSpecializations = e => {
    const updatedTrainer = {...trainer};    
    updatedTrainer.specializations[e.target.name] = e.target.value;
    setTrainer(updatedTrainer);
  }

  const handleUpdatePokemon = async (trainerParty) => {
    setDrawerLoading(true);
    const updatedParty = {...party};  
    updatedParty.party = trainerParty;
    const apiName = urls.name; 
    const path = urls.updateParty;
    const apiBody = {
        body: {
          party: updatedParty
        },
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
    }
    await API.put(apiName, path, apiBody).then(response => {
      setParty(response.party);
      setDrawerLoading(false);
    }).catch(error => {
        console.log(error.response)
    });
  }

  const handleAddPokemon = async(name) => {
    setDrawerLoading(true);
    const updatedParty = {...party};
    const monsterManual = urls.monstermanual;
    const pokemonPath = urls.getPokemon + name;
    await API.get(monsterManual, pokemonPath).then(async (response) => {
      const apiPokemon = response.Pokemon;

      const newStartingMoves = [];
      apiPokemon.MOVES["Starting Moves"].forEach(move => {
        const newMove = move.replace('-', ' ');
        newStartingMoves.push(newMove);
      })

      const startingMoves = [];
      const first4Moves = newStartingMoves.slice(0,4);
      first4Moves.forEach(move => {
        startingMoves.push({
          name: move,
          pp: 0
        })
      });
      
      let newPokemon = {
        maxHp: apiPokemon.HP,
        currentHp: apiPokemon.HP,
        hitDice: apiPokemon.HIT_DICE,
        level: apiPokemon.MIN_LVL_FOUND,
        nature: "No Nature",
        loyalty: 0, 
        evolution: apiPokemon.EVOLUTION,
        minLvlFound: apiPokemon.MIN_LVL_FOUND,
        type: apiPokemon.TYPE,
        walkingSpeed: apiPokemon.WALKING_SPEED,
        savingThrows: apiPokemon.SAVING_THROWS,
        abilities: apiPokemon.ABILITIES,
        stats: apiPokemon.STATS,
        armorClass: apiPokemon.ARMOR_CLASS,
        proficiencies: apiPokemon.SKILL_PROFICIENCIES,
        moves:{
          tm: apiPokemon.MOVES.TM,
          current: startingMoves,
          startingMoves: newStartingMoves,
          level: apiPokemon.MOVES.Level,
        },
        nickname: apiPokemon.NAME,
        name: apiPokemon.NAME,
        speciesRating: apiPokemon.SPECIES_RATING,
        exp: 0,
        currentAbility: apiPokemon.ABILITIES[0],
        hiddenAbility: apiPokemon.HIDDEN_ABILITY,
        status: {
          confused: false,
          paralyzed: false,
          frozen: false,
          poisoned: false,
          asleep: false,
          flinched: false,
          burned: false
        }
      }

      updatedParty.party.push(newPokemon);
      const apiName = urls.name; 
      const path = urls.updateParty;
      const apiBody = {
          body: {
            party: updatedParty
          },
          headers: {
            Authorization: props.currentUser.signInUserSession.idToken.jwtToken
          }
      }
      await API.put(apiName, path, apiBody).then(response => {
        setParty(response.party);
        setDrawerLoading(false);
      }).catch(error => {
          console.log(error.response)
      });
    }).catch(error => {
        console.log(error)
    });
  }

  const handleUpdatePokedex = async () => {
    setDrawerLoading(true);
    const updatedPokedex = {...pokedex};
    const apiName = urls.name;
    const path = urls.updatePokedex;
    const apiBody = {
        body: {
          pokedex: updatedPokedex
        },
        headers: {
          Authorization: props.currentUser.signInUserSession.idToken.jwtToken
        }
    }
    await API.put(apiName, path, apiBody).then(response => {
      setPokedex(response.pokedex);
      setDrawerLoading(false);
    }).catch(error => {
        console.log(error)
    });
  }

  const handleAddPokdex = newPokedex => {
    const updatedPokedex = {...pokedex};
    updatedPokedex.pokedex = newPokedex;
    setPokedex(updatedPokedex);
  }

  if (loading || updating) {
    return (
      <CircularProgress color="secondary"/>  
    );
  } else {
    return (
      <div className="body-container">
        <Drawer 
          anchor="right" 
          open={inventory}
          onClose={(e) => toggleDrawer(e,"inventory",false)}>
            <Inventory inventory={trainer.inventory} remove={removeItem}/>
        </Drawer>
        <Drawer anchor="right" open={pokemon} onClose={(e) => toggleDrawer(e,"pokemon",false)}>
          {drawerLoading ? 
            (<CircularProgress color="secondary"/>) : 
            (<Party 
              party={party.party} 
              update={handleUpdatePokemon} 
              add={handleAddPokemon} 
              pokedex={pokedex.pokedex}
              updatePokedex={handleUpdatePokedex}
              addPokedex={handleAddPokdex} />)
          }
        </Drawer>
        <Drawer anchor="right" open={tools} onClose={(e) => toggleDrawer(e,"tools",false)}>
          <ToolProfs toolProfs={trainer.toolProf} remove={removeProf}/>
        </Drawer>        
        <div className="cs-header">
          <div className="action-buttons">
            {isNew ? (newButtons()) : (updateButtons())}
          </div>
          <CharacterInfo info={trainer.info} update={handleUpdateInfo} user={currentUser} isEditable={!isEditable}/>
          <Details details={trainer.details} update={handleUpdateDetails} isEditable={!isEditable}/>
        </div>
        <div className="character-sheet-body">
          <div className="stat-block-container">
            <StatBlock statName="STR" statNum={trainer.stats.STR} update={handleUpdateStats} isEditable={!isEditable}/>
            <StatBlock statName="DEX" statNum={trainer.stats.DEX} update={handleUpdateStats} isEditable={!isEditable}/>
            <StatBlock statName="CON" statNum={trainer.stats.CON} update={handleUpdateStats} isEditable={!isEditable}/>
            <StatBlock statName="WIS" statNum={trainer.stats.WIS} update={handleUpdateStats} isEditable={!isEditable}/>
            <StatBlock statName="INT" statNum={trainer.stats.INT} update={handleUpdateStats} isEditable={!isEditable}/>
            <StatBlock statName="CHA" statNum={trainer.stats.CHA} update={handleUpdateStats} isEditable={!isEditable}/>
          </div>
          <div className="proficiencies-container">
            <Proficiencies 
              profs={trainer.savingThrows} 
              title="Saving Throws" 
              profBonus={trainer.basics.proficiency}
              update={handleUpdateProfs}
              isEditable={!isEditable}/>
            <Proficiencies 
              profs={trainer.skills} 
              title="Skills"
              profBonus={trainer.basics.proficiency}
              update={handleUpdateProfs}
              isEditable={!isEditable}/>            
          </div>
          <div className="details-container">
            <Basics 
              basics={trainer.basics} 
              passives={passives}
              update={handleUpdateBasics}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Specialization" 
              level="1" 
              info={trainer.specializations.Lvl1}
              name="Lvl1"
              update={handleUpdateSpecializations}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Trainer Path" 
              level="2" 
              info={trainer.trainerPaths.Lvl2}
              name="Lvl2"
              update={handleUpdateTrainerPath}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Trainer Path" 
              level="5" 
              info={trainer.trainerPaths.Lvl5}
              name="Lvl5"
              update={handleUpdateTrainerPath}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Specialization" 
              level="7" 
              info={trainer.specializations.Lvl7}
              name="Lvl7"
              update={handleUpdateSpecializations}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Trainer Path" 
              level="9" 
              info={trainer.trainerPaths.Lvl9}
              name="Lvl9"
              update={handleUpdateTrainerPath}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Trainer Path" 
              level="15" 
              info={trainer.trainerPaths.Lvl15}
              name="Lvl15"
              update={handleUpdateTrainerPath}
              isEditable={!isEditable}/>
            <TrainerPath 
              type="Specialization" 
              level="18" 
              info={trainer.specializations.Lvl18}
              name="Lvl18"
              update={handleUpdateSpecializations}
              isEditable={!isEditable}/>
          </div>                 
        </div>
      </div>
    );
  }
}

