import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../firebase";

export default function AddAlbum(props) {
  const [title, addTitle] = useState("");

  const handleAddAlbum = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .add({
        title: title
      })
      .then(() => {
        addTitle("");
        props.onClose(false);
      });

    props.onClose(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
        onClose={() => {
          props.onClose(false);
        }}
      >
        <DialogTitle id="form-dialog-title">Add Album</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Album Name"
            fullWidth
            onChange={e => {
              addTitle(e.target.value);
            }}
            value={title}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              props.onClose(false);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleAddAlbum}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
