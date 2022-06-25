

import Background from "../UI/Background";
import CardWrapper from "../UI/CardWrapper";
import classes from "./main.module.css";
import {useEffect,useState} from "react"
import * as d3 from "d3";

function Main() {
    const [curTemp, setCurTemp] = useState(-1)
    const [curCity, setCurCity] = useState(-1)
    const [curIcon, setCurIcon] = useState(-1)
    
    const Weather_API_KEY ='d0a10211ea3d36b0a6423a104782130e'
    
    async function fetchWeather() {if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longtude = position.coords.longitude;
            // console.log(latitude);
            
            fetch(`https://api.openweathermap.org/data/2.5//weather/?lat=${latitude}&lon=${longtude}&units=metric&APPID=${Weather_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                const temp =  result.main.temp;
                const city = result.name;
                setCurCity(city);
                setCurTemp(temp)
                setCurIcon(result.weather[0].icon)
    });

            // positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
        });
        
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
    } 
    
    // async function fetchCloth() {
    //     fetch(`http://www.football-data.co.uk/mmz4281/1718/I1.csv`)
    //     .then(res => res.json()) 
    //     .then(result =>
    //         console.log(result))
    // }
    // fetchCloth() 

    useEffect(()=>{
        fetchWeather()
    },[])

 

    
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
                <CardWrapper title='Weather' name={'no'}>
                    <div>
                        <h3>{`${curTemp === -1? 'loaing' : curTemp + ' degrees'}`}</h3>
                        <img src ={`http://openweathermap.org/img/w/${curIcon}.png`} alt="wthr img" />
                    </div>
                    <h3>{`${curCity === -1? 'loaing' : curCity}`}</h3>
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
                <CardWrapper title='Cloths' name={'no'}>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
             </div>
        </div>
        
    )
}

export default Main;