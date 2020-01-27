import React, { useState, useEffect, useCallback, useContext }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import app from '../../services/firebase';
import { AuthContext } from '../../Auth';

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
import NewInventory from '../../assets/inventory';

export default function CharacterSheet(props) {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerLoading, setDrawerLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [pokemon, setPokemon] = useState(false);
  const [tools, setTools] = useState(false);
  const [trainer, setTrainer] = useState({});
  const [trainerInventory, setTrainerInventory] = useState({});
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
      setTrainerInventory(NewInventory);
      calculateBonuses(newTrainer);
      setLoading(false);
    } else {
      if (currentUser !== undefined) {
          const trainerRef = await app.firestore().collection('users')
          .doc(currentUser.uid)
            .collection('trainers')
              .doc(props.match.params.id)

        trainerRef.get()
          .then(doc => {
            if (doc.exists) {
              const firebaseTrainer = doc.data().trainerSheet;
              setTrainer(firebaseTrainer);
              setParty(doc.data().pokemon);
              setPokedex(doc.data().pokedex);
              setTrainerInventory(doc.data().inventory);
              getPassives(firebaseTrainer);
              calculateBonuses(firebaseTrainer);
              setLoading(false);
            } else {
                console.log("No such document!");
            }    
        })
      }
    }
    
  }, [
    calculateBonuses, 
    props.match.params.id, 
    props.location.pathname, 
    currentUser,
  ]);

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
        <Button variant="outlined" color="primary" disabled={!isEditable} disableElevation onClick={(e) => toggleDrawer(e,"inventory",true)}>
          Inventory
        </Button>
        <Button variant="outlined" color="primary" disabled={!isEditable} disableElevation onClick={(e) => toggleDrawer(e,"pokemon",true)}>
          Pokemon
        </Button>
        <Button variant="outlined" color="primary" disabled={!isEditable} disableElevation onClick={(e) => toggleDrawer(e,"tools",true)}>
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
      setPokemon(status);
      setDrawerLoading(false)
    }
    if(drawer === "tools"){
      setTools(status)
    }
  }

  const updateTrainer = () => {
    setUpdating(true);
    const updatedTrainer = {...trainer};
    updatedTrainer.lastUpdate = new Date();  
    const trainerRef = app.firestore().collection("users")
      .doc(currentUser.uid)
        .collection('trainers')
          .doc(props.match.params.id);
          
    trainerRef.update({
      trainerSheet: updatedTrainer,
      inventory: trainerInventory
    })
    .then(() => {
      setIsEditable(false)
      setUpdating(false)
    })
        
  }

  const createTrainer = async () => {
    setUpdating(true);
    const newTrainer = trainer;
    newTrainer.dateCreated = new Date();
    const newTrainerRef = app.firestore().collection("users").doc(currentUser.uid).collection('trainers').doc()
    await newTrainerRef.set({
      id: newTrainerRef.id,
      trainerSheet: newTrainer,
      inventory: trainerInventory,
      pokemon: [],
      pokedex: []
    }).then(() => {
      newTrainerRef.get().then(doc => {
        history.push("/trainer-sheet/" + doc.data().id)
      })
    })
  }

  const removeItem = (item) => {
    const updatedInventory = [...trainerInventory]
    const index = updatedInventory.indexOf(item);
    if (index > -1) {
      updatedInventory.splice(index, 1);
    }
    setTrainerInventory(updatedInventory);
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

  const handleUpdateInfo = e => {
    const updatedTrainer = {...trainer};    
    updatedTrainer.info[e.target.name] = e.target.value;
    setTrainer(updatedTrainer);
  }

  const handleUpdateDetails = e => {
    const updatedTrainer = {...trainer};    
    updatedTrainer.details[e.target.name] = e.target.value;
    setTrainer(updatedTrainer);  
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
    const trainerRef = app.firestore().collection('users')
      .doc(currentUser.uid)
        .collection('trainers')
          .doc(props.match.params.id);

      trainerRef.update({
          pokemon: trainerParty,
        })
        .then(() => {
          trainerRef.get()
          .then(doc => {
            const firebaseParty = doc.data().pokemon;
            setParty(firebaseParty);
            setDrawerLoading(false);
          })
        })
  }

  const handleAddPokemon = async(name) => {
    setDrawerLoading(true);
    const updatedParty = [...party];
    app.database().ref('monstermanual/pokemon').once('value', (snapshot) => {
      const data = snapshot.val();
      const responsePokemon = data.find( pokemon => pokemon.name === name );
      if (responsePokemon !== undefined) {

        const startingMoves = [];
        const first4Moves = responsePokemon.Moves["Starting Moves"].slice(0,4);
        first4Moves.forEach(move => {
          startingMoves.push({
            name: move,
            pp: 0
          })
        });

        let newPokemon = {
          maxHp: responsePokemon.HP,
          currentHp: responsePokemon.HP,
          hitDice: responsePokemon.HitDice,
          level: responsePokemon.MinLvlFd,
          nature: "No Nature",
          loyalty: 0, 
          evolution: responsePokemon.Evolve,
          minLvlFound: responsePokemon.MinLvlFd,
          type: responsePokemon.Type,
          walkingSpeed: responsePokemon.WSp,
          flyingSpeed: responsePokemon.FSp,
          swimmingSpeed: responsePokemon.SSp,
          savingThrows: responsePokemon.saving_throws,
          abilities: responsePokemon.Abilities,
          stats: responsePokemon.attributes,
          armorClass: responsePokemon.AC,
          proficiencies: responsePokemon.Skill,
          moves:{
            tm: responsePokemon.Moves.TM,
            current: startingMoves,
            startingMoves: responsePokemon.Moves["Starting Moves"],
            level: responsePokemon.Moves.Level,
          },
          nickname: responsePokemon.name,
          name: responsePokemon.name,
          speciesRating: responsePokemon.SR,
          exp: 0,
          currentAbility: responsePokemon.Abilities[0],
          hiddenAbility: responsePokemon.HiddenAbility,
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

        if (newPokemon.evolution === undefined){
          newPokemon.evolution = null;
        }

        if (newPokemon.hiddenAbility === undefined){
          newPokemon.hiddenAbility = null;
        }

        if (newPokemon.walkingSpeed === undefined){
          newPokemon.walkingSpeed = null;
        }
        
        if (newPokemon.flyingSpeed === undefined){
          newPokemon.flyingSpeed = null;
        }
        if (newPokemon.swimmingSpeed === undefined){
          newPokemon.swimmingSpeed = null;
        }
        
        updatedParty.push(newPokemon);
        const trainerRef = app.firestore().collection('users')
        .doc(currentUser.uid)
          .collection('trainers')
            .doc(props.match.params.id);

        trainerRef.update({
            pokemon: updatedParty,
          })
          .then(() => {
            setParty(updatedParty);
            setDrawerLoading(false);
          })
      }
    });
  }

  const handleUpdatePokedex = async () => {
    setDrawerLoading(true);
    const updatedPokedex = [...pokedex];
    const trainerRef = app.firestore().collection('users')
      .doc(currentUser.uid)
        .collection('trainers')
          .doc(props.match.params.id);

      trainerRef.update({
        pokedex: updatedPokedex,
        })
        .then(() => {
          trainerRef.get()
          .then(doc => {
            const firebasePokedex = doc.data().pokedex;
            setPokedex(firebasePokedex);
            setDrawerLoading(false);
          })
        })
  }

  const handleAddPokdex = newPokedex => {
    let updatedPokedex = [...pokedex]
    updatedPokedex = newPokedex;
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
            <Inventory inventory={trainerInventory} remove={removeItem} isEditable={isEditable}/>
        </Drawer>
        <Drawer anchor="right" open={pokemon} onClose={(e) => toggleDrawer(e,"pokemon",false)}>
          {drawerLoading ? 
            (<CircularProgress color="secondary"/>) : 
            (<Party 
              party={party} 
              update={handleUpdatePokemon} 
              add={handleAddPokemon} 
              pokedex={pokedex}
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

