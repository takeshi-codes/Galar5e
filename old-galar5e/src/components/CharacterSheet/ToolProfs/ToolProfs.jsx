import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  toolProfsTableHeader: {
    margin: theme.spacing(1),
  },
}));

export default function ToolProfs(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [toolProfs, setToolProfs] = useState([...props.toolProfs]);
  const [newProf, setNewProf] = useState('');

  useEffect(() => {
    setToolProfs([...props.toolProfs]);
  }, [props.toolProfs]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewItem = e => {
    setNewProf(e.target.value);
  };

  const addItem = () => {
    const newToolProfs = toolProfs;
    newToolProfs.push(newProf);
    setToolProfs(newToolProfs);
    props.toolProfs.push(newProf);
    setOpen(false);
  };

  const toolProfTable = toolProfs.map((row, index) => (
    <TableRow key={index}>
      <TableCell alight="right">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => props.remove(row)}
        >
          <DeleteForeverIcon />
        </Button>
      </TableCell>
      <TableCell align="left">{row}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <div className={classes.toolProfsTableHeader}>
          <Typography variant="h6">Tool Proficiencies</Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>{toolProfTable}</TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleClickOpen}
      >
        Add Proficiency
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Tool Proficiency</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            onChange={handleNewItem}
            name="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
