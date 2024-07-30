import './app.css'
// eslint-disable-next-line import/order
import { useState, useEffect } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies

import ItemList from '../item-list'
import MoviesService from '../../services/movies-services'
import Spinner from '../spinner'

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  }

  const shortened = text.slice(0, maxLength)
  const lastSpaceIndex = shortened.lastIndexOf(' ')

  if (lastSpaceIndex === -1) {
    return `${shortened}...`
  }

  return `${shortened.slice(0, lastSpaceIndex)}...`
}

export default function App() {
  const [moviesList, setMoviesList] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const movieService = new MoviesService()
    movieService
      .getMovies()
      .then((res) => res.results.slice(0, 6))
      .then((res) => {
        // console.log(res)
        const items = res.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 150),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
        }))
        setMoviesList(items)
        setLoad(true)
        // console.log(items)
      })
  }, [])

  return (
    <div className="section">
      {!load && <Spinner />}
      <ItemList itemsList={moviesList} />
    </div>
  )
}
