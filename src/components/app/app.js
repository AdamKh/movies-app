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
  const [isLoaded, setLoaded] = useState(false)
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    errorDescription: null,
  })
  const [query, setQuery] = useState('return')
  const [searchPagValue, setSearchPagValue] = useState(1)
  const [searchTotal, setSearchTotal] = useState(0)
  const [ratedPagValue, setRatedPagValue] = useState(1)
  const [ratedTotal, setRatedTotal] = useState(0)
  const [ratingsLoaded, setRatingsLoaded] = useState(false)

  // Загружает оцененные фильмы
  const loadRatedMovies = (guestSessionId) => {
    movieService
      .getAllRatedMovies(guestSessionId)
      .then(({ allMovies: ratedMovies, totalResults }) => {
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

          setRatedMoviesList(items)
          setRatedTotal(totalResults)
          setRatingsLoaded(true)
        } else {
          setRatingsLoaded(true) // Устанавливаем как загруженные, даже если фильмов нет
        }
      })
      .catch(() => {
        setRatedMoviesList([])
        setRatedTotal(0)
        setRatingsLoaded(true)
      })
  }

  // Создание guest_session_id при необходимости и получение списка оценненных фильмов
  useEffect(() => {
    const guestSessionId = localStorage.getItem('guest_session_id')
    if (!guestSessionId) {
      movieService.createSessionId().then((res) => {
        const { guest_session_id: newGuestSessionId } = res
        localStorage.setItem('guest_session_id', newGuestSessionId)
        loadRatedMovies(newGuestSessionId)
      })
    } else {
      loadRatedMovies(guestSessionId)
    }
  }, [])

  // Получение списка фильмов по запросу либо по пагинации
  useEffect(() => {
    setLoaded(false)
    movieService
      .getMovies(query, searchPagValue)
      .then((movies) => {
        setSearchTotal(movies.total_results)
        const items = movies.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          text: shortenText(movie.overview, 100),
          imageUrl: movieService.getImage(movie.poster_path),
          releaseData: movie.release_date,
          genreIds: movie.genre_ids,
        }))
        setMoviesList(items)
      })
      .catch((err) => {
        setError({
          isError: true,
          errorMessage: err.name,
          errorDescription: err.message,
        })
        setLoaded(true)
      })
  }, [query, searchPagValue])

  // Перенос на 1 страницу при вводе
  useEffect(() => {
    setSearchPagValue(1)
  }, [query])

  // Добавление и обновление свойства rating для moviesList
  useEffect(() => {
    setLoaded(false)
    if (ratingsLoaded) {
      setMoviesList((prevMoviesList) => {
        // Создаем обновленный список фильмов с добавлением рейтингов
        const updatedMoviesList = prevMoviesList.map((movie) => {
          const ratedMovieData = ratedMoviesList.find((ratedMovie) => ratedMovie.id === movie.id)
          const newRating = ratedMovieData ? ratedMovieData.rating : undefined
          return { ...movie, rating: newRating }
        })

        // Проверяем, изменился ли список фильмов
        const isChanged = updatedMoviesList.some((movie, index) => movie.rating !== prevMoviesList[index].rating)

        // Возвращаем новый список фильмов, только если он изменился
        if (isChanged) {
          return updatedMoviesList
        }
        return prevMoviesList
      })
      setLoaded(true)
    }
  }, [ratedMoviesList, moviesList, searchPagValue, ratingsLoaded])

  return (
    <div className="section">
      <MovieAppProvider
        value={{
          movieService,
          guestSessionId: localStorage.getItem('guest_session_id'),
          moviesList,
          setMoviesList,
          isLoaded,
          error,
          setError,
          query,
          setQuery,
          ratedMoviesList,
          setRatedMoviesList,
          searchPagValue,
          setSearchPagValue,
          searchTotal,
          ratedPagValue,
          setRatedPagValue,
          ratedTotal,
        }}
      >
        <Tabs centered defaultActiveKey="1" items={tabs} destroyInactiveTabPane />
      </MovieAppProvider>
    </div>
  )
}
