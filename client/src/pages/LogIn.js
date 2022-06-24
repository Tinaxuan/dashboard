import Background from "../UI/Background";
import classes from "./login.module.css";
import {Link} from 'react-router-dom';
import Update from "../button";

function LoginPage() {
    return (
        <div>
            <Background/>
            <h1>Hackathon</h1>
            <form>
                <div className={classes.inputField}>
                <input className= {classes.input} type="text" name="id" id="username" placeholder ="Username" required></input>
                <input className= {classes.input} type="password" name="pw" id="password" placeholder ="Password" autoComplete="off" required></input>
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