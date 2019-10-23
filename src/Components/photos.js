import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import PhotoCard from "./photocard";
import AddPhoto from "./addphoto";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function Photos() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <div>
        <Fab
          style={{ marginTop: 10 }}
          variant="extended"
          color={"secondary"}
          aria-label="delete"
        >
          <AddIcon style={{ marginRight: 8 }} />
          Add Photo
        </Fab>
      </div>
    </div>
  );
}
