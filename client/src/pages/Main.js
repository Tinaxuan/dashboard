import Background from "../UI/Background";
import CardWrapper from "../UI/CardWrapper";
import classes from "./main.module.css";
import { useEffect, useState } from "react";
import Parser from "rss-parser";
import * as d3 from "d3";
import * as d4 from "d3-collection";
import STasklist from "../UI/STasklist";
import SImageList from "../UI/SImageList";

function Main() {
  const get_test = [
    {
      id: "1",
      taskName: "start1",
      ischecked: true,
    },
    {
      id: "2",
      taskName: "start2",
      ischecked: true,
    },
    {
      id: "3",
      taskName: "start3",
      ischecked: false,
    },
    {
      id: "4",
      taskName: "start4",
      ischecked: false,
    },
  ];

  const get_test_image = [
    {
      id: "1",
      imageURL: "https://en.wikipedia.org/wiki/Image",
    },
  ];

  const [curTemp, setCurTemp] = useState(-1);
  const [curCity, setCurCity] = useState(-1);
  const [curIcon, setCurIcon] = useState(-1);
  const [curNews, setCurNews] = useState(-1);
  const [curUser, setCurUser] = useState("loading");
  const [curImagePhoto, setCurImagePhoto] = useState("loading");
  const [curImages, setCurImages] = useState(null);
  const [curTask, setCurTask] = useState(get_test);
  let tasks_slice;
  let images_slice;

  //get the current user information name task
  const get_currentUser = function () {
    fetch("http://localhost:5000/user/current")
      .then((res) => res.json())
      .then((jsn) => {
        if (jsn.msg === "Successful") {
          console.log(jsn.session);
          // currentUser = jsn.session.name;
          setCurUser(jsn.session.name);
          setCurImagePhoto(jsn.session.image_photo);
          setCurImages(jsn.session.images);
          let task = jsn.session.task;
          if (jsn.session.task.length > 3) {
            tasks_slice = task.slice(0, 3);
          } else {
            tasks_slice = task;
          }
          setCurTask(tasks_slice);
          // console.log("current user", currentUser)
          // tasks_slice = curTask;
          console.log(curTask);
          // process the image
          let images = jsn.session.images;
          if (jsn.session.images.length > 4) {
            images_slice = images.slice(0, 4);
          } else {
            images_slice = images;
          }
          setCurImages(images_slice);
        }
      })
      .catch((err) => console.log(err));
  };
  //get the news from the outer website
  async function fetchNews() {
    const parser = new Parser();
    const url = "http://feeds.bbci.co.uk/news/rss.xml";
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

  //get weather information from open weather throught html position api
  const Weather_API_KEY = "d0a10211ea3d36b0a6423a104782130e";

  async function fetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longtude = position.coords.longitude;
        // console.log(latitude);

        fetch(
          `https://api.openweathermap.org/data/2.5//weather/?lat=${latitude}&lon=${longtude}&units=metric&APPID=${Weather_API_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            const temp = result.main.temp;
            const city = result.name;
            setCurCity(city);
            setCurTemp(temp);
            setCurIcon(result.weather[0].icon);
          });

        // positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }
  //read from the json data and count them then draw the pie chart
  async function fetchCloth() {
    const url =
      "https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.payload);
        const payload = result.payload;
        const allCloth = {};
        for (let i in payload) {
          if (payload[i].clothe in allCloth) {
            allCloth[payload[i].clothe]++;
          } else {
            allCloth[payload[i].clothe] = 1;
          }
        }

        console.log(allCloth);
        var width = 100;
        var height = 100;
        var margin = 10;

        var radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the div called 'my_dataviz'
        var svg = d3
          .select("#pie")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var data = allCloth;
        var colour = d3.scaleOrdinal(d3.schemeCategory10);
        var pie = d3.pie().value(function (d) {
          return d.value;
        });
        var data_ready = pie(d4.entries(data));

        svg
          .selectAll("whatever")
          .data(data_ready)
          .enter()
          .append("path")
          .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
          .attr("fill", function (d) {
            return colour(d.data.key);
          })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
      });

    //     var countedNames = names.reduce(function (allNames, name) {
    //          if (name in allNames) { allNames[name]++; }
    //          else { allNames[name] = 1; }
    //          return allNames; }, {});
    // })
  }

  useEffect(() => {
    fetchWeather();
    fetchNews();
    fetchCloth();
    get_currentUser();
  }, []);

  return (
    <div>
      <Background />
      <div>
      <img width="100" margin="20" src={curImagePhoto} alt="" />
      <h1>Hello there, {curUser}</h1>
      </div>
      <div className={classes.main_screen}>
        <CardWrapper title="Weather" name={"no"}>
          <div style={{ display: "flex", alignItems: "center", height: "50" }}>
            <img
              style={{ width: "25%" }}
              src={`http://openweathermap.org/img/w/${curIcon}.png`}
              alt="wthr img"
            />
            <h3>{`${curTemp === -1 ? "loaing" : curTemp + " degrees"}`}</h3>
          </div>
          <h3>{`${curCity === -1 ? "loaing" : curCity}`}</h3>
        </CardWrapper>
        <CardWrapper title="News" link="/news">
          <h3>{curNews.title}</h3>
        </CardWrapper>
        <CardWrapper title="Sports">
          <h3>Sports page: the csv link seems be removed//can't be fetched//error 301</h3>
        </CardWrapper>
        <CardWrapper title="Photos" link="/images">
          <SImageList images={curImages}></SImageList>
        </CardWrapper>
        <CardWrapper title="Tasks" link="/tasks">
          {/* <h3>weather shown here in detail</h3> */}
          <STasklist tasks={curTask}></STasklist>
        </CardWrapper>
        <CardWrapper title="Cloths" name={"no"}>
          <div id="pie"></div>
        </CardWrapper>
      </div>
    </div>
  );
}

export default Main;
