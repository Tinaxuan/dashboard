import React, {useEffect, useState} from 'react';
import Background from "../UI/Background";
import Parser from 'rss-parser';
import classes from './news.module.css';

import {useHistory } from "react-router-dom";

function NewsPage () {
    const [curNews, setCurNews] = useState(-1)
    const [curImage, setCurImage] = useState(-1)
    const history = useHistory();
    
    async function fetchNews() {
        // const parser = new Parser();
        // const url = 'http://feeds.bbci.co.uk/news/rss.xml'
        // const feed = await parser.parseURL(url);
        // console.log(feed.items[0].content);
        // setCurNews(feed.items[0])

        


        const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml'
        fetch(url)
        .then(response => response.json())
        .then(res =>{
            console.log(res);
            const feed = res.items[0];
            console.log(feed);
            setCurNews(feed)
            setCurImage(res.feed.image);
        })
         // feed will have a `foo` property, type as a string
    }


    



    // async function fetchNews() {
    //     fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml')
    //         .then((response) => {response.text()
    //             console.log(response.text())
    //         })
    //         .then((responseData) => rssParser.parse(responseData))
    //         .then((rss) => {
    //             console.log(rss.title);
    //             console.log(rss.items.length);
    // })};
    function back(){
        history.push("/main");
    }

    useEffect(()=>{
        fetchNews()
        console.log(classes)
    },[])
    
    return (
        
        <div style={{ margin:50, padding: 50, backgroundColor: '#ffffff70'}} clasName={classes.news}>
            <button onClick={back}>Back</button>
            <Background/>
            <h1>News</h1>
            <div style={{ textAlign: 'center'}} clasName={classes.images}>
                <img src={curImage}  width="50%" height="200"></img>
            </div>
            <h2>{curNews.title}</h2>
            <h3>{curNews.content}</h3>

        </div>
    )
}



export default NewsPage;