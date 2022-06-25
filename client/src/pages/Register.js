import { useRef, useState } from "react";
import Background from "../UI/Background";
import classes from './register.module.css';
import 'antd/dist/antd.css';
import {Button, Upload} from 'antd'


function RegisterPage() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_t_Ref = useRef();
    const imageUrl = useRef();
    const inputRef = useRef();
    // const [imageUrl, setImageUrl] = useState('');
    // const [loading, setLoading] = useState(false);

    function submit(event) {
        event.preventDefault();
        console.log(usernameRef.current.value);
    }

    const handleChange = (info) => {
        if(info === undefined) {
            return
        }
        // input 的reference, files的内容就是你的真实的文件，用这个文件里的内容去上传，files[0]是一个blob格式的文件。
        console.log(info.target.files[0])
        // inputRef.current.style这个是input的所有css的style内容
        console.log(inputRef.current.style)
        var reader = new FileReader();
        reader.readAsDataURL(info.target.files[0])
        reader.onload = () => {
            imageUrl.current.style.backgroundImage = "url("+reader.result+")";
            // inputRef.current.style.backgroundImage = "url("+reader.result+")";

        }
      };
    
    // function showImage(input) {
    //     console.log(imageUrl.current.value);
    //     var reader = new FileReader();
    //     const inputImage = document.getElementById('upload_image');
    //     reader.addEventListener("load", () => {
    //       const uploaded = reader.result;
    //       inputImage.style.backgroundImage = `url(${uploaded})`;
    //     });
    //     reader.readAsDataURL(this.files[0]);
    //     reader.onload = function(e) {
    //         inputImage.style.backgroundImage='url()'
    //     }
    //     var file= input.files[0];
    //     var url = window.URL.createObjectURL(file);
    //     console.log(url);
    //     this.style.src = url;
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
                <div style={{textAlign: 'center'}} title="">
                    <div ref={imageUrl} className={classes.inputImage} title="" >
                        <input style={{ opacity: 0, margin: 0 }} 
                            ref={inputRef} 
                            className={classes.inputImage} 
                            onChange={handleChange} 
                            id='upload_image' 
                            type="file" 
                            name="file" 
                            />
                        <div style={{position: 'relative', fontSize: 100, top:'-100%', zIndex:-1}}>+</div>
                    </div>
                </div>
                {/* <img ref={imageUrl} src=""/> */}
                 {/* <Upload
                    name="avatar"
                    maxCount={1}
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/"
                    onChange={handleChange}
                    >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : 'UPLOAD'}
                </Upload> */}
                <br></br>
                <div style={{textAlign: 'center'}}>
                    <button className={classes.button} id="register">Register</button>  
                </div>  
            </form>
        </div>
    )

  
    

    

}

export default RegisterPage;