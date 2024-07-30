import './app.css'
// eslint-disable-next-line import/order
import { useState, useEffect } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import ItemList from '../item-list'
import MoviesService from '../../services/movies-services'
import Spinner from '../spinner'
import ErrorHandler from '../error'
import SearchBar from '../searchbar'
import Pagination from '../pagination'

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
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    errorDescription: null,
  })

  useEffect(() => {
    const movieService = new MoviesService()
    movieService
      .getMovies()
      .then((res) => res.results.slice(0, 6))
      .then((res) => {
        const items = res.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 150),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
        }))
        setMoviesList(items)
        setLoad(true)
      })
      .catch((err) => {
        setLoad(true)
        setError({
          isError: true,
          errorMessage: err.name,
          errorDescription: err.message,
        })
      })
  }, [])

  return (
    <div className="section">
      <SearchBar />
      <Online>
        {error.isError && <ErrorHandler errorMessage={error.errorMessage} errorDescription={error.errorDescription} />}
        {!load && <Spinner />}
        <ItemList itemsList={moviesList} />
      </Online>
      <Offline>
        <Alert type="error" message="Проверьте подключение к сети" description="Ноу интернет коннектион" />
      </Offline>
      <Pagination />
    </div>
  )
}
