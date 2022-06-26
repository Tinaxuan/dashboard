import { useRef, useState } from "react";
import Background from "../UI/Background";
import classes from './register.module.css';
import 'antd/dist/antd.css';



function RegisterPage() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_t_Ref = useRef();
    const imageUrl = useRef();
    const inputRef = useRef();
    // const [imageUrl, setImageUrl] = useState('');
    // const [loading, setLoading] = useState(false);
    let msg_add;
    const addUser = async function(username,email,password) {
        await fetch("http://localhost:5000/users/addUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username:username,email:email,password: password})
            })
            .then(res => res.json())
            .then(dta => {
                console.log(dta);
                msg_add = dta.msg;
                console.log(msg_add);
            })
            .catch(err => console.log(err))
        // return msg
    }

    function submit(event) {
        event.preventDefault();
        console.log(passwordRef.current.value);
        console.log(password_t_Ref.current.value);
        // addUser(usernameRef.current.value,emailRef.current.value, passwordRef.current.value)
        if (passwordRef.current.value == password_t_Ref.current.value) {
            console.log("isSamel");
            addUser(usernameRef.current.value,emailRef.current.value, passwordRef.current.value)
            if (msg_add === "successfully resgisted") {
                console.log('in');
                window.location.href="/login";
                //change the page
            }
        } else {
            console.log("isDifferent");
            //change the colour of the check password input field
        }
       


    }

    const handleChange = (info) => {
        if(info === undefined) {
            return
        }
        // const upload = multer({
        //     limits: {
        //       fileSize: 4 * 1024 * 1024,
        //     }
        //   });
        // input 的reference, files的内容就是你的真实的文件，用这个文件里的内容去上传，files[0]是一个blob格式的文件。
        console.log(info.target.files[0])
        // inputRef.current.style这个是input的所有css的style内容
        console.log(inputRef.current.style)
        var reader = new FileReader();
        reader.readAsDataURL(info.target.files[0])
        reader.onload = () => {
            imageUrl.current.style.backgroundImage = "url("+reader.result+")";
            // var canvas = document.createElement("canvas");

            // // var canvas = document.getElementById("canvas");
            // var ctx = canvas.getContext("2d");

            // // Actual resizing
            // ctx.drawImage(img, 0, 0, 280, 280);
            // var dataurl = canvas.toDataURL(imageFile.type);
            // console.log(reader.result);
            // inputRef.current.style.backgroundImage = "url("+reader.result+")";
        }
      };
    
    
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
                            accept="image/*"
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