import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { auth, db } from "../firebase";

export function Todo(props) {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (props.user) {
      db.collection("users")
        .doc(props.user.uid)
        .collection(props.match.params.list_name)
        .onSnapshot(snapshot => {
          const updatedTasks = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            updatedTasks.push({
              text: data.text,
              checked: data.checked,
              id: doc.id
            });
          });
          setTasks(updatedTasks);
        });
    }
    return unsubscribe;
  }, [props.user, props.match.params.list_name]);
  console.log(props);

  const handleAddTask = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection(props.match.params.list_name)
      .add({ text: value, checked: false });
    setValue("");
  };

  const handleChangeTask = (task_id, value) => {
    db.collection("users")
      .doc(props.user.uid)
      .collection(props.match.params.list_name)
      .doc(task_id)
      .update({ checked: value });
  };

  const handleDeleteTask = task_id => {
    db.collection("users")
      .doc(props.user.uid)
      .collection(props.match.params.list_name)
      .doc(task_id)
      .delete();
  };

  if (tasks === []) {
    return <div />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper
        style={{ width: "100%", maxWidth: 800, marginTop: 30, padding: 10 }}
      >
        <Typography variant="h5">{props.match.params.list_name}</Typography>
        <div style={{ display: "flex", margin: 25, alignItems: "center" }}>
          <TextField
            label="New Todo"
            style={{ flexGrow: 1, marginRight: 10 }}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div>
            <Button onClick={handleAddTask} color="primary" variant="contained">
              Add
            </Button>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <List>
            {tasks.map(task => (
              <ListItem key={task.id} dense>
                <ListItemIcon>
                  <Checkbox
                    check={task.checked}
                    onChange={(e, checked) =>
                      handleChangeTask(task.id, checked)
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={task.text} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </div>
  );
}
