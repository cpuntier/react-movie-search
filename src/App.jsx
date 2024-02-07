import { useState, useEffect } from "react";
import "./App.css";

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";



export default function App() {
  let randomNumber = ""
  for (let i = 0; i < 7; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }

  const apiKey = "98e3fb1f";

  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (e) {
      console.error(e)
    }
  }

  const randomMoviebyID = async (randomNumber) => { //made this to get a random movie via imdb id's would like better way to ensure movie exists but this works for now.
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${randomNumber}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (e) {
        console.error(e)
      }
    }
  
  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    randomMoviebyID("tt" + randomNumber);
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
