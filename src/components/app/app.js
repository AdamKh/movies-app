import './app.css'

import { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import SearchTab from '../tabs/search-tab'
import RatedTab from '../tabs/rated-tab'
import MoviesService from '../../services/movies-services'
import { MovieAppProvider } from '../movies-app-service-context'

const movieService = new MoviesService()

const tabs = [
  {
    key: '1',
    label: 'Search',
    children: <SearchTab />,
  },
  {
    key: '2',
    label: 'Rated',
    children: <RatedTab />,
  },
]

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
  const [ratedMoviesList, setRatedMoviesList] = useState([])
  const [isLoaded, setLoading] = useState(false)
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    errorDescription: null,
  })
  const [query, setQuery] = useState('return')
  const [pagValue, setPagValue] = useState(1)

  useEffect(() => {
    movieService.createSessionId().then((res) => {
      const guestSessionId = localStorage.getItem('guest_session_id')
      if (!guestSessionId) {
        const { guest_session_id: newGuestSessionId } = res
        localStorage.setItem('guest_session_id', newGuestSessionId)
      }
    })
    movieService.getRated(localStorage.getItem('guest_session_id')).then((ratedMovies) => {
      const items = ratedMovies.results.map((ratedMovie) => ({
        id: ratedMovie.id,
        rating: ratedMovie.rating,
      }))
      setRatedMoviesList(items)
    })
  }, [])

  useEffect(() => {
    setLoading(false)
    movieService
      .getMovies(query, pagValue)
      .then((movies) => {
        const items = movies.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 100),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
        }))
        setMoviesList(items)
        setLoading(true)
        // console.log(items)
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
          movieService,
          guestSessionId: localStorage.getItem('guest_session_id'),
          moviesList,
          setMoviesList,
          isLoaded,
          setLoading,
          error,
          setError,
          query,
          setQuery,
          pagValue,
          setPagValue,
          ratedMoviesList,
          setRatedMoviesList,
        }}
      >
        <Tabs centered defaultActiveKey="1" items={tabs} />
      </MovieAppProvider>
    </div>
  )
}
