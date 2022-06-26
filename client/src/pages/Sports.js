import Background from "../UI/Background";
import React, {useEffect, useState} from 'react';




function SportsPage() {

    async function fetchSports () {
    
        const url = 'http://www.football-data.co.uk/mmz4281/1718/I1.csv'
        
        // fetch(url)
        // .then(response => response.text())
        // .then(res =>{
        //     console.log(res);
        // }
    }

    useEffect(()=>{
        fetchSports()
    },[])
    return(
        <div>
            <Background/>

        </div>
    )

}

export default SportsPage;