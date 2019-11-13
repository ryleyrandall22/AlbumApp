import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../firebase";

export default function AddPhoto(props) {
  const [value, setValue] = useState("");

  const handleAddPhoto = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .doc(props.match.params.album_id)
      .collection("photos")
      .add({ title: value, url: "" });
    props.onClose(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        onClose={() => {
          props.onClose(false);
        }}
      >
        <DialogTitle id="form-dialog-title">Add Photo</DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            autoFocus
            margin="dense"
            label="Photo Title"
            fullWidth
          />
          <Button variant="contained" style={{ margin: 10 }}>
            Choose File
          </Button>
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
          <Button
            onClick={() => {
              handleAddPhoto();
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
