import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Todo.css';
import db from './firebase';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, FormControl, ListItem, List, ListItemText, ListItemAvatar, Avatar, Modal, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => {
        setOpen(true)
    };
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: false });
        setInput('');
        setOpen(false);
    }


    return (
        <div className="todo">

            <Modal open={open} onClose={_e => setOpen(false)} className="todo__modal">
                <div className={classes.paper}>
                    <h3>Update Todo</h3>
                    <FormControl className="todo__modalForm">
                        <form>
                            <TextField
                            label="update todo"
                            placeholder={props.todo.todo}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            variant="outlined"
                            size="small"/>
                            <Button type="submit" color="primary" variant="contained" size="small" className="todo__submit" onClick={updateTodo}>update</Button>
                        </form>
                    </FormControl>
                </div>
            </Modal>
            <Grid container justify="center" className="todo__list">
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={props.todo.todo}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="primary" aria-label="edit" onClick={handleOpen}>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton edge="end" color="secondary" aria-label="delete" onClick={_event => db.collection('todos').doc(props.todo.id).delete()}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Todo