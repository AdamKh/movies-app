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

  // Создание guest_session_id при необходимости +
  // Получение списка оценненных фильмов
  useEffect(() => {
    const guestSessionId = localStorage.getItem('guest_session_id')
    if (!guestSessionId) {
      movieService.createSessionId().then((res) => {
        const { guest_session_id: newGuestSessionId } = res
        localStorage.setItem('guest_session_id', newGuestSessionId)
      })
    }

    movieService
      .getAllRatedMovies(guestSessionId)
      .then((ratedMovies) => {
        if (ratedMovies && ratedMovies.length > 0) {
          const items = ratedMovies.map((ratedMovie) => ({
            id: ratedMovie.id,
            title: ratedMovie.title,
            text: shortenText(ratedMovie.overview, 100),
            imageUrl: movieService.getImage(ratedMovie.poster_path),
            releaseData: ratedMovie.release_date,
            genreIds: ratedMovie.genre_ids,
            rating: ratedMovie.rating,
          }))

          // Объединяем новые фильмы с существующим списком, избегая дублирования
          setRatedMoviesList(items)
        }
      })
      .catch(() => {
        // Обрабатываем случай, когда нет оценённых фильмов
        setRatedMoviesList([])
      })
  }, [])

  // Перенос на 1 страницу при вводе
  useEffect(() => {
    setPagValue(1)
  }, [query])

  // Получение списка фильмов по запросу либо по пагинации
  useEffect(() => {
    setLoading(false)

    movieService
      .getMovies(query, pagValue)
      .then((movies) => {
        // console.log(movies.results)
        const items = movies.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 100),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
          genreIds: movie.genre_ids,
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

  // Добавление и обновление свойства rating для moviesList
  useEffect(() => {
    setMoviesList((prevMoviesList) =>
      prevMoviesList.map((movie) => ({
        ...movie,
        rating: (ratedMoviesList.find((ratedMovie) => ratedMovie.id === movie.id) || {}).rating,
      }))
    )
  }, [ratedMoviesList, moviesList, pagValue])

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
        <Tabs centered defaultActiveKey="1" items={tabs} destroyInactiveTabPane />
      </MovieAppProvider>
    </div>
  )
}
