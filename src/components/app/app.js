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
import { MovieAppProvider } from '../movies-app-service-context'

const movieService = new MoviesService()

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
  const [isLoaded, setLoading] = useState(false)
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    errorDescription: null,
  })
  const [query, setQuery] = useState('return')
  const [pagValue, setPagValue] = useState(1)

  useEffect(() => {
    movieService
      .createSessionId()
      .then((res) => {
        const guestSessionId = localStorage.getItem('guest_session_id')
        if (!guestSessionId) {
          const { guest_session_id: newQuestSessionId } = res
          localStorage.setItem('guest_session_id', newQuestSessionId)
        }
        // movieService.getRated(localStorage.getItem('guest_session_id')).then((resm) => console.log(resm))
      })
      .catch((err) => {
        setLoading(true)
        setError({
          isError: true,
          errorMessage: err.name,
          errorDescription: err.message,
        })
      })
  }, [])

  useEffect(() => {
    setLoading(false)
    movieService
      .getMovies(query, pagValue)
      .then((res) => {
        const items = res.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 100),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
        }))
        setMoviesList(items)
        setLoading(true)
      })
      .catch((err) => {
        setLoading(true)
        setError({
          isError: true,
          errorMessage: err.name,
          errorDescription: err.message,
        })
      })
  }, [query, pagValue])

  return (
    <div className="section">
      <MovieAppProvider
        value={{
          postRating: (guestSessionId, id, rating) => movieService.postRating(guestSessionId, id, rating),
          guestSessionId: localStorage.getItem('guest_session_id'),
        }}
      >
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

            return <ItemList moviesList={moviesList} />
          })()}
        </Online>
        <Offline>
          <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
        </Offline>
        <button
          type="button"
          onClick={() =>
            movieService.getRated(localStorage.getItem('guest_session_id')).then((ratedmov) => console.log(ratedmov))
          }
        >
          button
        </button>
        <Pagination setPagValue={setPagValue} />
      </MovieAppProvider>
    </div>
  )
}
