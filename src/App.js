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
import ListIcon from "@material-ui/icons/PhotoAlbum";
import { auth, db } from "./firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { Route } from "react-router";
import Photos from "./Components/photos";

export function App(props) {
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [value, setValue] = useState("");
  const [albums, seAlbums] = useState(["Dogs", "Cats", "Houses"]);

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
      <Photos />

      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div>
          <List>
            {albums.map(list => (
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
              <ListItemText primary={"Add Album"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
