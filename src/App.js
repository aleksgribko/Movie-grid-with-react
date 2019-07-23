import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar.js'
import Main from './components/Main.js'
import Footer from './components/Footer.js'
import './App.css';
import { movies$ } from "./components/movies.js";

function App() {
  const [movies, setMovies] = useState([])
  const [forceUpdate, setForceUpdate] = useState(true);

  // populate hook movies in the first render
  if (!movies.length) {
    movies$.then(movies => setMovies(movies))
  }

  // all actions: thumb up, thumb down, delete
  function movieBaseManipulation(id, act) {       
    movies.find((movie, ind, array) => {
      if(movie.id === id) {
          switch(act){
            case 'up':
                ++array[ind].likes;
                break;
            case 'down':
                ++array[ind].dislikes;
                break;
            case 'del':
                array.splice(ind, 1);
                break;
            default:
                break;
          }        
        setMovies(array)            
        return true
      }
      return false      
    })
    setForceUpdate(!forceUpdate)
  }
 
  return (
    <div className="App">
      <HeaderBar movies={movies} />
      <Main movies={movies} movieBaseManipulation={movieBaseManipulation} />
      <Footer />
    </div>
  );
}

export default App;
