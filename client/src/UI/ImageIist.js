import ImageItem from "./ImageItem";

function ImageList(props) {
    if (props.images === null) {
        return null;
    }

    return(
        <ul>
        {props.images.map((image) => (
            <ImageItem
            key={image.id}
            id={image.id}
            imageURL={image.images}  
            />
        ))}
    </ul>   
    )
}

export default ImageList;