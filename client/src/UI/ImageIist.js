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
            <div key={image.id} id={image.id} style={{ textAlign: "center" }}>
              <img style={{ width: "100%" }} src={image.images}></img>
            </div>
          );
        })}
      </ul>
    );
  }
  
  export default ImageList;