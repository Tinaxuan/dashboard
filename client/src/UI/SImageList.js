function SImageList(props) {
    if (props.images === null) {
      return null;
    }
  
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: 2,
        }}
      >
        {props.images.map((image) => {
          return (
            <div key={image.id} id={image.id} style={{ textAlign: "center" }}>
              <img style={{ width: "100%" }} src={image.images}></img>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default SImageList;