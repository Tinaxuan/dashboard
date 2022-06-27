import React, {useEffect, useState} from 'react';
import Background from "../UI/Background";
import Parser from 'rss-parser';
import classes from './news.module.css';

function NewsPage () {
    const [curNews, setCurNews] = useState(-1)
    const [curImage, setCurImage] = useState(-1)
    
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
        console.log(feed.items[0].content);
        setCurNews(feed.items[0]);
        setCurImage(feed.image.url);
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

    useEffect(()=>{
        fetchNews()
        console.log(classes)
    },[])
    
    return (
        <div style={{color:'white', margin:50, padding: 50, backgroundColor: '#ffffff70'}} clasName={classes.news}>
            <Background/>
            <h1>News</h1>
            <div style={{ textAlign: 'center'}} clasName={classes.images}>
                <img src={curImage}  width="300" height="200"></img>
            </div>
            <h2>{curNews.title}</h2>
            <h3>{curNews.content}</h3>

        </div>
    )
}



export default NewsPage;