import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.googel.com/youtube/player_parameters
            autoplay: 1,

        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    //https://www.youtube.com/watch?v=udFllgUUyyI

                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'));

                }).catch(error => console.log(error))
        }

    }

    return (

        <div className='row'>
            <h2>{title}</h2>

            <div className="row_posters">
                {/* row_poster */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`} alt={movie.name} />

                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row



//snippet of code which runs based on a specific condition
// if [] run once when the row loads and dont run again
//if [movie ] its dependent
//"https://api.themoviedb.org/3" its url bignig awaite antil axios respond
//'/trending/all/week?api_key=${API_KEY}&language=en-us', this key
