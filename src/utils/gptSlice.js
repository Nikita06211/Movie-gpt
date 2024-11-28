import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGptSearch: false,
        groqMovies: null,
        movieNames: null,
        movieResults: null
    },
    reducers:{
        toggleGptSearchView: (state, action)=>{
            state.showGptSearch = !state.showGptSearch;
        },
        addGroqMovieResult: (state, action)=>{
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleGptSearchView, addGroqMovieResult} = gptSlice.actions;

export default gptSlice.reducer;