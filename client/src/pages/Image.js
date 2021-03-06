import Background from "../UI/Background";
import ImageList from "../UI/ImageIist";
import { useRef, useEffect, useState } from "react";
import classes from "./image.module.css";
import { useHistory } from "react-router-dom";

function ImagePage() {
  const history = useHistory();
  // const test_image = [
  //   { id: 0, imageURL: "img1" },
  //   { id: 1, imageURL: "img1" },
  // ];
  const imgRef = useRef();
  const inputRef = useRef();
  const [curUser, setCurUser] = useState("loading");
  const [curImages, setCurImages] = useState(null);
  const [curDelete, setCurDelete] = useState(null);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width;
  var ch = canvas.height;
  var maxW = 280;
  var maxH = 280;
  let resizedImage;
  function handleChange(e) {
    var img = new Image();
    img.onload = function () {
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      resizedImage = canvas.toDataURL("image/jpeg", 0.5);
      console.log(resizedImage);
      let updated_images = curImages;
      console.log(curImages);
      const id = curImages.length;
      updated_images.push({ id: id, images: resizedImage });
      console.log(updated_images);
      updateImages(curUser, updated_images);
      window.location.reload();
    };
    img.src = URL.createObjectURL(e.target.files[0]);
    // if(curImages === null) {
    //     updated_images = resizedImage;
    // } else {
    //     updated_images.push(resizedImage);
    // }
    // console.log(resizedImage);
    // console.log(updated_images);
    // updateImages(curUser,updateImages)
    get_currentUser();
    // imgRef.current.style.backgroundImage = "url("+img.src+")"
  }

  const get_currentUser = async function () {
    fetch("/user/current")
      .then((res) => res.json())
      .then((jsn) => {
        if (jsn.msg === "Successful") {
          console.log(jsn.session);
          setCurUser(jsn.session.name);
          setCurImages(jsn.session.images);
        } else {
          console.log(jsn.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateImages = async function (username, images) {
    let msg;
    await fetch("/update_images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, images: images }),
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        msg = dta.msg;
      })
      .catch((err) => console.log(err));
    return msg;
  };
  function back() {
    history.push("/main");
  }

  function delete_image(number) {
    setCurDelete(number);
    console.log(number);
    let modified_images=curImages;
    console.log("modified_images");
    console.log(modified_images[number]);
    for (let i=number; i<curImages.length;i++) {
      modified_images[i].id = modified_images[i].id-1;
    }
    modified_images.splice(number,1);
    // console.log(modified_task);
    updateImages(curUser,modified_images);
    
}

  useEffect(() => {
    get_currentUser();
  }, []);

  return (
    <div>
      <Background />
      <button onClick={back} className={classes.button}> &#8249;</button>
      <h1>Photos</h1>
      <ImageList images={curImages} delete_image={delete_image}></ImageList>
      <div style={{ textAlign: "center" }} title="">
        <div ref={imgRef} className={classes.inputImage} title="">
          <input
            style={{ opacity: 0, margin: 0 }}
            ref={inputRef}
            className={classes.inputImage}
            onChange={handleChange}
            id="upload_image"
            type="file"
            accept="image/*"
            name="file"
          />
          <div
            style={{
              position: "relative",
              fontSize: 80,
              top: "-100%",
              zIndex: -1,
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePage;
