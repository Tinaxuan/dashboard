
import Background from "../UI/Background";
import CardWrapper from "../UI/CardWrapper";
import classes from "./main.module.css";
let latitude;
let longitude;

function Main() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude);
            // positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
    console.log(latitude);
    
        // let latitude;
        // let longitude;
        // navigator.geolocation.getCurrentPosition((position=>{
        //         latitude = position.coords.latitude;
        //         longitude = position.coords.longitude;
        //         }
        //     ))
        //     console.log(latitude,longitude);
      
    return (
        <div>
            <Background/>
            <h1>Hello there</h1>
            <div className={classes.main_screen}>
                <CardWrapper title='Weather'>
                    <h3>{latitude}</h3>
                </CardWrapper>
                <CardWrapper title='News'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Sports'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Photos'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Tasks'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Cloths'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
             </div>
        </div>
        
    )
}

export default Main;