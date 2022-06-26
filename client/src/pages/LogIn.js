import Background from "../UI/Background";
import classes from "./login.module.css";
import {Link,useHistory} from 'react-router-dom';
import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

function LoginPage() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    //check the password in the database
    const history = useHistory();
    const login_check = async function(username, password){
        await fetch(`http://localhost:5000/login/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({password: password})
            })
            .then(res => res.json())
            .then(dta => {
                console.log(dta);
                if (dta.msg === "successful") {
                    history.push("/main");
                }
                
            })
            .catch(err => console.log(err))

    }
    //call when the form is submit.

    function submit(event) {
        event.preventDefault();
        console.log(usernameRef.current.value);
        console.log(passwordRef.current.value);
        let username = usernameRef.current.value;
        let password = passwordRef.current.value
        login_check(username,password);

    }

    return (
        <div>
            <Background/>
            <h1>Hackathon</h1>
            <form onSubmit={submit}>
                <div className={classes.inputField}>
                <input className= {classes.input} ref={usernameRef} type="text" name="id" id="username" placeholder ="Username" required></input>
                <input className= {classes.input} ref={passwordRef} type="password" name="pw" id="password" placeholder ="Password" autoComplete="off" required></input>
                </div>
                <br></br>
                <button className={classes.button} id="login">Login</button>
            </form>
            <div className={classes.bottomArea}> 
            <h2>New to the Hackathon? <Link className= {classes.link} to='/register'> Sign up</Link></h2>
            </div>
        </div>
    )
}

export default LoginPage;