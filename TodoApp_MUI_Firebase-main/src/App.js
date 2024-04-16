
import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase';
import Todo from './Todo';
import Navbar from './Navbar';
import { Grid,TextField, Button } from '@material-ui/core'

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => { 
    db.collection('todos').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
    })
  }, []);

  const createTodo = (e) => {
    e.preventDefault();
    db.collection('todos').add({
      todo: input
    });
    setInput('');
  };
  return (
    <div className="App">
      <Navbar />
      <div>
      <Grid container spacing={3} justify="center" className="App__grid">
        <Grid item xs={8} sm={8} md={6} lg={4}>
          <form>
            <TextField
              label="Write a todo"
              variant="outlined"
              size="small"
              value={input}
              onChange={e => setInput(e.target.value)} />
            <Button disabled={!input} type="submit" variant="contained" className="App_submitBtn" onClick={createTodo}>Add Todo</Button>
          </form>
        </Grid>
      </Grid>
      </div>
      {todos.map(todo => (
      <Todo todo={todo} />
    ))}

        {/* <Todo todo="Learn React Js" />
        <Todo todo="Read Book" />
        <Todo todo="Complete projects" /> */}
    </div>
  );
}

export default App;




