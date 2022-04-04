import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"

function Detail() {
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState([]) 

    const {id} = useParams()
    const getMovie = async () => {
        // id에 맞는 영화의 세부정보를 가져옴
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json()
        setMovie(json.data.movie)
        setLoading(false)
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (loading ? <h1>Loading</h1> : <div>
        <img src={movie.large_cover_image} />
        <h1>{movie.title}</h1>
        <p>Rating: ${movie.rating}</p>
        <p>Runtime: ${movie.runtime}</p>
        <p>{movie.description_full}</p>
        <ul>
            {movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
        </ul>
    </div>)
}

export default Detail