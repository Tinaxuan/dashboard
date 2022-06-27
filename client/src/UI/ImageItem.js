function ImageItem(props) {
    return(
        <div style={{wdith:300}}>
            <img src={props.imageURL}></img>  
        </div>
    )
}

export default ImageItem;