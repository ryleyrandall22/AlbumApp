import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import PhotoCard from "./photocard";
import AddPhoto from "./addphoto";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";

export default function Photos(props) {
  const [d_open, setDOpen] = useState(false);
  const [photos, setPhotos] = useState([
    { id: 1, image: "", title: "Hello" },
    { id: 2, image: "", title: "IDK" }
  ]);

  useEffect(() => {
    let unsubscribe;
    // if (props.user) {
    //   unsubscribe = db
    //     .collection("users")
    //     .doc(props.user.uid)
    //     .collection("albums")
    //     .doc(props.match.params.album_id)
    //     .collection("photos")
    //     .onSnapshot(snapshot => {
    //       const newPhotos = [];
    //       snapshot.forEach(doc => {
    //         newPhotos.push({ title: doc.data().title, id: doc.id });
    //       });
    //       setPhotos(newPhotos);
    //     });
    // }

    return unsubscribe;
  }, [props.user, props.match.params.album_id]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {photos.map(photo => {
        return <PhotoCard key={photo.id} data={photo} />;
      })}

      <div>
        <Fab
          style={{ marginTop: 10 }}
          variant="extended"
          color={"secondary"}
          aria-label="delete"
          onClick={() => {
            setDOpen(true);
          }}
        >
          <AddIcon style={{ marginRight: 8 }} />
          Add Photo
        </Fab>
        <AddPhoto {...props} open={d_open} onClose={setDOpen} />
      </div>
    </div>
  );
}
