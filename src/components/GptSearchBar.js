import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import groq from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGroqMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);
    const searchMovieTMDB = async (movie) =>{
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    }
    const handleGptSearchClick=async()=>{
        console.log(searchText.current.value);
        const query = "Act as a Movie Recommendation system and suggest some movies for the query "+ searchText.current.value + ", only give me names of 5 movies and no other extra text, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        const completion = await groq.chat.completions
        .create({
        messages: [
            {
            role: "user",
            content: query,
            },
        ],
        model: "llama3-8b-8192",
        })
     
        const groqMovies = completion.choices[0]?.message?.content.split(",");
        const promiseArray = groqMovies.map(movie=> searchMovieTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);

        dispatch(addGroqMovieResult({movieNames: groqMovies, movieResults: tmdbResults}));

        // console.log("Dispatched movie names and results to Redux store.");
        
    }

  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center'>
      <form className=' bg-white border-4 border-black w-3/4 md:w-1/2 grid grid-cols-12 rounded-full' onSubmit={(e)=>e.preventDefault()}>
        <input ref = {searchText} className='p-4 m-1 col-span-8 md:col-span-10 rounded-full text-lg' type="text" placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='bg-red-700 text-white col-span-4 md:col-span-2 py-2 px-4 rounded-full text-sm font-bold md:text-lg' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GptSearchBar;
