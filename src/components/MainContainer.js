import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  // Check if movies is undefined or empty
  if (!movies || movies.length === 0) {
    console.log("No movies available in nowPlayingMovies.");
    return <div className="text-white">Loading...</div>; // Optional fallback UI
  }

  const mainMovie = movies[0];
  console.log("mainMovie =", mainMovie);

  const { original_title, overview, id } = mainMovie || {}; // Fallback destructuring

  return (
    <div className="pt-[50%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
