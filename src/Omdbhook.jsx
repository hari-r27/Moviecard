import React, { useReducer,useState } from 'react'
import axios from 'axios';
import  './Omdbhook.css'
const Omdbhook = () => {
    
    const [searchVal, setSearchval] = useState("")

    let initialState = {
        movies: [],
        loading: false,
        error: false,
    }

    let getApi = async ()=>{
      dispatch({type: "loading"})
      try{
            let {data: {Search}} = await axios.get(`https://www.omdbapi.com/?s=${searchVal}&apikey=93c94948`)
            console.log(Search)
            dispatch({type: "setData", payload: Search})
            // dispatch({type:"show value"})
          }
          catch(err){
            console.log(err)
           dispatch({type: "error"})
          }
    }

    let handleMovieData =  (currentState, {type, payload})=>{
        if(type=="loading"){
          console.log("its loading")
        return {...currentState,  loading: true, error: false}
        }
        else if(type=="setData"){
          console.log("setting data")
          console.log(payload)
        return {...currentState, movies: payload, error:false, loading: false}
        }
        else if(type=="error"){
          console.log("its error")
        return {...currentState, loading:false,  error: true}
        }
        else{
          return currentState
        }
    }

    const [state, dispatch] = useReducer(handleMovieData, initialState)

  return (
    <div className="container">
        <div className="searchContainer">
            <input type="text"  onChange={(e)=> setSearchval(e.target.value)}/>
            <button onClick={()=> getApi()}>search</button>
        </div>
    
        <div className="subContainer">     
        {state.loading && <div className="loading" style={{fontSize:"32px"}}>Loading...<span className="loader"></span></div>}
        {state.error && <div className="errormsg" style={{fontSize:"32px"}}>Error occurred.</div>}

       {!state.loading && !state.error && <div className="movieList">
            {state.movies?.map(({Title, Year, Poster, imdbID})=>{
                return(
                <div key={imdbID} className="movieCard">
               <img src={Poster=="N/A"? noImg : Poster} alt="" />
                {/* <p>{Title}</p> */}
                {/* <p>{Year}</p> */}
              </div>
                )
            })}
        </div>}
        
        </div>

    </div>
  )
}


export default Omdbhook




// searchedMovie: "avenger"
