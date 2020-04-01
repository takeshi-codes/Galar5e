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
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  inventoryTableContainer: {
    height: '95%',
    overflowY: 'auto',
  },
  inventoryTable: {
    height: '100%',
  },
  inventoryTableHeader: {
    margin: theme.spacing(1),
  },
}));

export default function Inventory(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([...props.inventory]);
  const [editing, setEditing] = useState();
  const [itemIndex, setItemIndex] = useState();
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    quantity: 0,
  });

  useEffect(() => {
    setInventory([...props.inventory]);
  }, [props.inventory, props.isEditable]);

  const handleClickOpen = () => {
    setNewItem({
      name: '',
      description: '',
      quantity: 0,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewItem = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    newItem.quantity = Number(newItem.quantity);
    const newInventory = inventory;
    newInventory.push(newItem);
    setInventory(newInventory);
    props.inventory.push(newItem);
    setOpen(false);
  };

  const editItem = (item) => {
    setItemIndex(props.inventory.indexOf(item));
    const editingItem = {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    };
    setEditing(true);
    setNewItem(editingItem);
    setOpen(true);
  };

  const updateItem = () => {
    newItem.quantity = Number(newItem.quantity);
    const newInventory = inventory;
    newInventory[itemIndex] = newItem;
    setInventory(newInventory);
    props.inventory[itemIndex] = newItem;
    setOpen(false);
  };

  const inventoryTable = inventory.map((row) => (
    <TableRow key={row.name}>
      <TableCell alight="right">
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={() => props.remove(row)}
        >
          <DeleteForeverIcon />
        </Button>
      </TableCell>
      <TableCell alight="right">
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={() => editItem(row)}
        >
          <EditIcon />
        </Button>
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
    </TableRow>
  ));

  return (
    <div className={classes.inventoryTableContainer}>
      <TableContainer className={classes.inventoryTable} component={Paper}>
        <div className={classes.inventoryTableHeader}>
          <Typography variant="h6">Inventory</Typography>
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            onClick={handleClickOpen}
          >
            Add Item
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{inventoryTable}</TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item-name"
            label="Name"
            onChange={handleNewItem}
            defaultValue={newItem.name}
            name="name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="item-description"
            label="Description"
            onChange={handleNewItem}
            defaultValue={newItem.description}
            name="description"
            fullWidth
          />
          <TextField
            margin="dense"
            id="item-quantity"
            label="Quantity"
            type="number"
            defaultValue={newItem.quantity}
            onChange={handleNewItem}
            name="quantity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          {editing ? (
            <Button variant="outlined" onClick={updateItem} color="primary">
              Save
            </Button>
          ) : (
            <Button variant="outlined" onClick={addItem} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
