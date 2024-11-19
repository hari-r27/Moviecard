import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Omdb.css'

function OmdbByUseffect() {
let[state,setstate]=useState([]);                                                               /*i=tt3896198*/
let[change,setchange]=useState("");
let[search,setsearch]=useState("Avenger");
let[error,createrror]=useState(false);
let[loading,setloading]=useState(false);
let gettingapi= async()=>{
    setloading(true)
   try{
    let {data:{Search}}= await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=7ca2c7c6`);
    // console.log(finaldata);
    console.log(Search);
    setstate(Search);
    setloading(false)
    }
    catch(err){
        createrror(true);
        console.log(err);
        setloading(false)

    }
}
let changingtime=({target:{value}})=>{

    setchange(value);
    // console.log(value)
}
// console.log(change);
useEffect(()=>{
gettingapi();
},[search])
let serachingmovie=((e)=>{
setsearch(change)
})
// console.log(state);
  return (
   <section>
    <div className='inputdiv'>
    <input type="search" placeholder='Movies Name' onChange={changingtime} />
    <button onClick={serachingmovie}>Search</button>
    </div>
    <div className='errorbox' style={{display:"block"}}>
    {error&&<img src='https://th.bing.com/th?id=OIP.-jpf97RnnZ2AypV2ozBhRQHaId&w=233&h=267&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'alt='No image'/>}
    </div>
   
    <div className='parentimg'>
 

     {
      state?state?.map((e)=>{
        return<div key={e.imdbID} className='imagediv'>
    {loading&&<img src='https://cdn.dribbble.com/users/760347/screenshots/7341673/media/b5af68cdf397db3063f89e5b466aab11.gif' alt='No Image'/>}

            <img src={e.Poster} alt="https://sayingimages.com/wp-content/uploads/my-boyfriend-face-when-he-said-no-memes.png" /></div>
       }):<h1 style={{color:"White"}}>Movie Name Not Found</h1>
     }
 </div>
   </section>
  )
}

export default OmdbByUseffect
