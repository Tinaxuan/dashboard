// import { read } from "fs";
import { useRef } from "react";
import Background from "../UI/Background";
import classes from './register.module.css'


function RegisterPage() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_t_Ref = useRef();

    function submit(event) {
        event.preventDefault();
        console.log(usernameRef.current.value);
    }
    // const imageUrl = useRef;
    // function showImage(input) {
    //     console.log(imageUrl.current.value);
    //     // var reader = new FileReader();
    //     // const inputImage = document.getElementById('upload_image');
    //     // reader.addEventListener("load", () => {
    //     //   const uploaded = reader.result;
    //     //   inputImage.style.backgroundImage = `url(${uploaded})`;
    //     // });
    //     // reader.readAsDataURL(this.files[0]);
    //     // reader.onload = function(e) {
    //         // inputImage.style.backgroundImage='url()'
    //     // }
    // //     var file= input.files[0];
    // //     var url = window.URL.createObjectURL(file);
    // //     console.log(url);
    // //     this.style.src = url;
    // }

    return (
        <div>
            <Background/>
            <h1>Hackathon</h1>
            <form onSubmit={submit}>
                <div className={classes.inputField}>
                    <input className= {classes.input} ref={usernameRef} id='username' type='text' placeholder='Username'></input>
                    <input className= {classes.input} ref={emailRef} id='email' type='email' placeholder='Email'></input>
                </div>
                <div className={classes.inputField}>
                    <input className= {classes.input} ref={passwordRef}  id='passward' type="password" placeholder='Password'></input>
                    <input className= {classes.input} ref={password_t_Ref} id='password_check' type="password" placeholder='Comfirm password'></input>
    
                </div>
                {/* <input className={classes.inputImage} onChange={showImage(this)} ref={imageUrl} id='upload_image' type="file" name="file" /> */}
                <br></br>
                <button className={classes.button} id="register">Register</button>    
            </form>
        </div>
    )

  
    

    

}

export default RegisterPage;