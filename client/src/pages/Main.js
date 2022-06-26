
import Background from "../UI/Background";
import CardWrapper from "../UI/CardWrapper";
import classes from "./main.module.css";
import {useEffect,useState} from "react"
import Parser from 'rss-parser';
import * as d3 from "d3";
import * as d4 from 'd3-collection';

function Main() {
    const [curTemp, setCurTemp] = useState(-1)
    const [curCity, setCurCity] = useState(-1)
    const [curIcon, setCurIcon] = useState(-1)
    const [curNews, setCurNews] = useState(-1)
    async function fetchNews () {
        const parser = new Parser();
        const url = 'http://feeds.bbci.co.uk/news/rss.xml'
        // const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml'
        // fetch(url)
        // .then(response => response.json())
        // .then(res =>{
        //     console.log(res);
        // })
        const feed = await parser.parseURL(url);
        // console.log(feed.items[0].content);
        setCurNews(feed.items[0]);
         // feed will have a `foo` property, type as a string
    }
    
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

    async function fetchCloth(){
        const url = 'https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil';
        fetch(url)
        .then(res=>res.json()) 
        .then(result =>{
            // console.log(result.payload);
            const payload = result.payload;
            const allCloth={};
            for (let i in payload){
                if (payload[i].clothe in allCloth) {
                    allCloth[payload[i].clothe]++; 
                } else {
                    allCloth[payload[i].clothe] =1;
                }
            }

            console.log(allCloth);
            var width = 100
            var height = 100
            var margin = 10
        
            var radius = Math.min(width, height) / 2 - margin
        
        // append the svg object to the div called 'my_dataviz'
            var svg = d3.select("#pie")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var data = allCloth;
            var colour = d3.scaleOrdinal(d3.schemeCategory10);
            var pie = d3.pie()
                    .value(function(d) {return d.value; })
            var data_ready = pie(d4.entries(data))

            svg
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                )
                .attr('fill', function(d){ return(colour(d.data.key)) })
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
    })
    
        //     var countedNames = names.reduce(function (allNames, name) {
        //          if (name in allNames) { allNames[name]++; } 
        //          else { allNames[name] = 1; } 
        //          return allNames; }, {});
        // })
    }

        
    useEffect(()=>{
        fetchWeather();
        fetchNews();
        fetchCloth();
    },[])

 

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
                <CardWrapper title='News'link="/news">
                    <h3>{curNews.title}</h3>
                </CardWrapper>
                <CardWrapper title='Sports' >
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Photos'>
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Tasks'link="/tasks">
                    <h3>weather shown here in detail</h3>
                </CardWrapper>
                <CardWrapper title='Cloths' name={'no'}>
                    <div id='pie'></div>
                </CardWrapper>
             </div>
        </div>
        
    )
}

export default Main;