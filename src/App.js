import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import { auth, db } from "./firebase";
import { Todo } from "./Components/Todo";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { Route } from "react-router";

export function App(props) {
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [value, setValue] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (!u) {
        props.history.push("/");
      } else {
        setUser(u);
      }
    });
    return unsubscribe;
  }, [props.history, user]);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("Lists")
        .onSnapshot(snapshot => {
          const Lists = [];
          snapshot.forEach(doc => {
            Lists.push(doc.data().name);
          });
          setLists(Lists);
        });
    }
    return unsubscribe;
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User was Signed Out");
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!user) {
    return <div />;
  }

  const handleAddList = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("Lists")
      .add({ name: value });
    setDialog(false);
    setValue("");
    props.history.push("/app/" + encodeURI(value) + "/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: 12 }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, color: "inherit" }}>
            Ryley's App
          </Typography>
          <Typography style={{ color: "inherit", marginRight: 10 }}>
            Hi! {user.email}
          </Typography>
          <Button onClick={handleSignOut} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Route
        path={"/app/:list_name"}
        render={routeProps => <Todo user={user} {...routeProps} />}
      />

      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div>
          <List>
            {lists.map(list => (
              <ListItem
                button
                onClick={() => {
                  props.history.push("/app/" + encodeURI(list) + "/");
                  setDrawer(false);
                }}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary={list} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => {
                setDialog(true);
                setDrawer(false);
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add List"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>New List</DialogTitle>
        <DialogContent style={{ width: 500 }}>
          <TextField
            autoFocus
            fullWidth
            label="New List"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleAddList}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
