import './app.css'

import { useState, useEffect } from 'react'
import { Offline, Online } from 'react-detect-offline'

import ItemList from '../item-list'
import MoviesService from '../../services/movies-services'
import Spinner from '../spinner'
import ErrorHandler from '../error/error-handler'
import EmptyQuery from '../error/empty-query'
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
  const [isLoaded, setLoad] = useState(false)
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    errorDescription: null,
  })
  const [query, setQuery] = useState('return')

  useEffect(() => {
    const movieService = new MoviesService()
    setLoad(false)
    movieService
      .getMovies(query)
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
  }, [query])

  return (
    <div className="section">
      <SearchBar setQuery={setQuery} />
      <Online>
        {(() => {
          if (!isLoaded) {
            return <Spinner />
          }

          if (error.isError) {
            return <ErrorHandler errorMessage={error.errorMessage} errorDescription={error.errorDescription} />
          }

          if (moviesList.length === 0) {
            return <EmptyQuery errorDescription="Фильмы с таким названием не найдены" />
          }

          return <ItemList itemsList={moviesList} />
        })()}
      </Online>
      <Offline>
        <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
      </Offline>
      <Pagination />
    </div>
  )
}
