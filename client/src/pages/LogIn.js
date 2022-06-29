import Background from "../UI/Background";
import classes from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";

function LoginPage() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  //check the password in the database
  const history = useHistory();
  const login_check = async function (username, password) {
    await fetch(`/login/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password }),
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        if (dta.msg === "successful") {
          history.push("/main");
        } else if (dta.msg === "it is not matched") {
          alert("the passward is wrong, check it again");
        } else if (dta.msg === "could not find users") {
          alert("the user doesn't exist, please register");
        }
      })
      .catch((err) => console.log(err));
  };
  //call when the form is submit.

  function submit(event) {
    event.preventDefault();
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    login_check(username, password);
  }

  return (
    <div>
      <Background />
      <h1>Hackathon</h1>
      <form onSubmit={submit}>
        <div className={classes.inputField}>
          <input
            className={classes.input}
            ref={usernameRef}
            type="text"
            name="id"
            id="username"
            placeholder="Username"
            required
          ></input>
          <input
            className={classes.input}
            ref={passwordRef}
            type="password"
            name="pw"
            id="password"
            placeholder="Password"
            autoComplete="off"
            required
          ></input>
        </div>
        <br></br>
        <button className={classes.button} id="login">
          Login
        </button>
      </form>
      <div className={classes.bottomArea}>
        <h2>
          New to the Hackathon?{" "}
          <Link className={classes.link} to="/register">
            {" "}
            Sign up
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default LoginPage;
