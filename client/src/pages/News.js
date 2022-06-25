import React, {useEffect, useState} from 'react';
import Background from "../UI/Background";
import Parser from 'rss-parser';

const News = (props) => {
    
    async function fetchNews () {
        const parser = new Parser();
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml'

        const feed = await parser.parseURL(url);
        console.log(feed); // feed will have a `foo` property, type as a string
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
    },[])
    
    return (
        <div>
            <Background/>
            news
        </div>
    )
}



export default News;