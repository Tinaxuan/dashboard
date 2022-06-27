import { useRef, useState,useEffect } from "react";
import Background from "../UI/Background";
import classes from './register.module.css';
import 'antd/dist/antd.css';
import {useHistory} from 'react-router-dom';



function RegisterPage() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_t_Ref = useRef();
    const imgRef = useRef();
    const inputRef = useRef();
    const history = useHistory();
    const [passwardSame, setPasswardSame] = useState(false)
    const [passward, setPassWord] = useState('')
    let resizedImage;
    // const [imageUrl, setImageUrl] = useState('');
    // const [loading, setLoading] = useState(false);
    let msg_add;
    const addUser = async function(username,email,password,image) {
        await fetch("http://localhost:5000/users/addUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username:username,
                    email:email,
                    password: password,
                    image:image})
            })
            .then(res => res.json())
            .then(dta => {
                console.log(dta);
                msg_add = dta.msg;
                console.log(msg_add);
                if (msg_add == "successfully resgisted") {
                    console.log('in');
                    history.push('/login')
                    //change the page
                } else if (msg_add="Username already exists") {
                    console.log("should change username");
    
                }
            })
            .catch(err => console.log(err))
        // return msg
    }

    function submit(event) {
        event.preventDefault();
        console.log(passwordRef.current.value);
        console.log(password_t_Ref.current.value);
        // addUser(usernameRef.current.value,emailRef.current.value, passwordRef.current.value)
        if (passwordRef.current.value === password_t_Ref.current.value) {
            console.log("isSamel");
            addUser(usernameRef.current.value,emailRef.current.value, passwordRef.current.value,resizedImage)
        } else {
            console.log("isDifferent");
            //change the colour of the check password input field
        }
       
    }

    var canvas=document.createElement("canvas");
    var ctx=canvas.getContext("2d");
    var maxW=280;
    var maxH=280;


    function handleChange(e) {
        var img = new Image;
            img.onload = function() {
                var iw=img.width;
                var ih=img.height;
                var scale=Math.min((maxW/iw),(maxH/ih));
                var iwScaled=iw*scale;
                var ihScaled=ih*scale;
                canvas.width=iwScaled;
                canvas.height=ihScaled;
                ctx.drawImage(img,0,0,iwScaled,ihScaled);
                resizedImage = canvas.toDataURL("image/jpeg",0.5);
                console.log(resizedImage)
            }
        img.src = URL.createObjectURL(e.target.files[0]);
        imgRef.current.style.backgroundImage = "url("+img.src+")"
    }

    useEffect(()=>{
        setPasswardSame(passwordRef.current.value === password_t_Ref.current.value)
    },[passward])

    // const handleChange = (info) => {
    //     if(info === undefined) {
    //         return
    //     }
    //     // const upload = multer({
    //     //     limits: {
    //     //       fileSize: 4 * 1024 * 1024,
    //     //     }
    //     //   });
    //     // input 的reference, files的内容就是你的真实的文件，用这个文件里的内容去上传，files[0]是一个blob格式的文件。
    //     console.log(info.target.files[0])
    //     // inputRef.current.style这个是input的所有css的style内容
    //     console.log(inputRef.current.style)
    //     var reader = new FileReader();
    //     reader.readAsDataURL(info.target.files[0])
    //     var canvas = document.createElement("canvas");
    //     reader.onload = () => {
    //         imageUrl.current.style.backgroundImage = "url("+reader.result+")";
    //         var image = new Image();//create a image
    //         image.src = reader.result;
    //         image.onload = function() {
    //             var ctx = canvas.getContext("2d");
    //             ctx.drawImage(image, 0, 0, 280, 280);

    //         }
    //         // var canvas = document.createElement("canvas");

    //         // var ctx = canvas.getContext("2d");
    //         // ctx.drawImage(image, 0, 0, 280, 280);
    //         var dataurl = canvas.toDataURL('image/jpeg',0.5);
    //         console.log("resized:"+dataurl);
    //         // inputRef.current.style.backgroundImage = "url("+reader.result+")";
    //     }
    //   };

    
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
                    <input
                        onChange={(v) => setPassWord(v.target.value)}
                        style={{color: passwardSame? 'black':'red'}}
                        className= {classes.input}
                        ref={password_t_Ref}
                        id='password_check' 
                        type="password"
                        placeholder='Comfirm password'/>
    
                </div>
                <div style={{textAlign: 'center'}} title="">
                    <div ref={imgRef} className={classes.inputImage} title="" >
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
                {/* <img ref={imgRef} src=""/> */}
                 {/* <Upload
                    name="avatar"
                    maxCount={1}
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/"
                    onChange={handleChange}
                    >
                    {imgRef ? <img src={imgRef} alt="avatar" style={{ width: '100%' }} /> : 'UPLOAD'}
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