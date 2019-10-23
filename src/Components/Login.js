import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";
import Photo from "./campus.jpeg";
import Reactlogo from "./Reactlogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Route, Link } from "react-router-dom";
import { auth } from "../firebase";

export function Login(props) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app");
      }
    });
    return unsubscribe;
  }, [props.history]);

  const handleToggle = () => {
    if (login === true) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const handleLogin = () => {
    if (login === true) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User is Signed In");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User was successfuly Created");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: "inherit" }}>
            {login ? "Login" : "Signup"}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Paper
          style={{
            width: "100%",
            maxWidth: 400,
            margin: 30,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <img
              src={Reactlogo}
              alt={"React Logo"}
              style={{ width: "33%", height: "auto" }}
            />
            <Typography
              style={{ width: "100%", textAlign: "center" }}
              variant="h6"
            >
              {login ? "Login" : "Signup"}
            </Typography>
            <TextField
              style={{ marginTop: 20 }}
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              style={{ marginTop: 10 }}
              label="Password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div
              style={{
                marginTop: 20,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography>
                {login ? "Don't have an account?" : "Have an account?"}{" "}
                <Button color="primary" onClick={handleToggle}>
                  {" "}
                  {login ? "Signup" : "Login"}
                </Button>
              </Typography>
              <Button
                color="primary"
                variant="contained"
                style={{ width: 100 }}
                onClick={handleLogin}
              >
                {login ? "Login" : "Signup"}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
