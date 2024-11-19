import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/movieSlice';


const useMovieTrailer = (movieId)=>{

    const dispatch = useDispatch();
  const getMovieVideos = async () => {
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      // Ensure `results` exists in the API response
      if (!json.results || !Array.isArray(json.results)) {
        throw new Error('Invalid API response: results is missing or not an array');
      }

      // Filter for trailers
      const filterData = json.results.filter((video) => video.type === 'Trailer');
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer))

      console.log('Trailer:', trailer); // Debug output
    } catch (error) {
      console.error('Error fetching movie videos:', error.message);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);

}

export default useMovieTrailer;