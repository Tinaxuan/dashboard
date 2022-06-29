import Background from "../UI/Background";
import React, { useEffect, useState, useRef } from "react";
import classes from "./sports.module.css";
import TeamList from "../UI/TeamList";
import { useHistory } from "react-router-dom";

function SportsPage() {
  const [curTeamB, setCurTeamB] = useState(-1);
  const inputteamRef = useRef();
  const history = useHistory();
  const fetchSports = async function (teamName) {
    await fetch(`/getSports/${teamName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        setCurTeamB(dta);
      })
      .catch((err) => console.log(err));
  };

  //   useEffect(() => {

  //   }, []);

  function submit(event) {
    event.preventDefault();
    let input = inputteamRef.current.value;
    fetchSports(input);
  }
  function back() {
    history.push("/main");
  }
  return (
    <div>
      <Background />
      <button className={classes.button} onClick={back}>Back</button>
      <h1>Sports</h1>
      <form className={classes.inputField} onSubmit={submit}>
        <input
          className={classes.input}
          type="text"
          name="team"
          ref={inputteamRef}
          id="team"
          placeholder="Enter the team name"
          required
        ></input>
        <button>enter</button>
      </form>
      <TeamList teams={curTeamB} />
    </div>
  );
}

export default SportsPage;
