// import ImageItem from "./ImageItem";

// function ImageList(props) {
//     if (props.images === null) {
//         return null;
//     }

//     return(
//         <ul style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridGap: 20}}>
//         {props.images.map((image) => (
//             <ImageItem
//             key={image.id}
//             id={image.id}
//             imageURL={image.images}  
//             />
//         ))}
//     </ul>   
//     )
// }

// export default ImageList;

function ImageList(props) {
    if (props.images === null) {
      return null;
    }

    function delete_image(number) {
      console.log("try to delete "+ number)
      props.delete_image(number);
  }


  
    return (
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: 20,
        }}
      >
        {props.images.map((image) => {
          return (
            <div key={image.id} id={image.id} style={{ padding:'5px 10px',textAlign: "center",background: '#ffffff70' }}>
              <img style={{ width: "100%", marginBottom:"2px"}} src={image.images}></img>
              <button onClick={()=>delete_image(image.id)}>delete</button>
            </div>
          );
        })}
      </ul>
    );
  }
  
  export default ImageList;