import { useState, useEffect } from "react";
import Movie from "../components/Movie"

function Home() {
    const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])

  // fetch, then과 동일한것임
  const getMovies = async() => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
    const json = await response.json()
    setMovies(json.data.movies)
    setLoading(false)
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (<div>
    {loading ? 
    <h1>Loading...</h1> 
    : (<div>
      {movies.map((movie) => ( 
      <Movie
      key={movie.id}
      id={movie.id} // movie에서 링크에 id 넣어주기 위함
      coverImg={movie.medium_cover_image}
      title={movie.title} 
      summary={movie.summary} 
      genres={movie.genres}/>
    ))}
      </div>
      )}
  </div>)
}

export default Home