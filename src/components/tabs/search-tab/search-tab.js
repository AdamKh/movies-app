import '../tab.css'

import { Offline } from 'react-detect-offline'

import ItemList from '../../item-list'
import Spinner from '../../spinner'
import ErrorHandler from '../../error/error-handler'
import SearchBar from '../../searchbar'
import Pagination from '../../pagination'

export default function SearchTab({
  moviesList,
  setQuery,
  isLoaded,
  error,
  searchPagValue,
  setSearchPagValue,
  searchTotal,
  guestSessionId,
  ratedMoviesList,
  setRatedMoviesList,
}) {
  return (
    <>
      <SearchBar setQuery={setQuery} />
      {(() => {
        if (!isLoaded) {
          return <Spinner />
        }

        if (error.isError) {
          return (
            <ErrorHandler
              errorMessage={error.errorMessage}
              errorDescription={`${error.errorDescription}. Maybe you need to enable VPN ZenMate`}
            />
          )
        }

        if (moviesList.length === 0) {
          return <ErrorHandler errorDescription="Фильмы с таким названием не найдены" />
        }

        return (
          <ItemList
            moviesList={moviesList}
            guestSessionId={guestSessionId}
            ratedMoviesList={ratedMoviesList}
            setRatedMoviesList={setRatedMoviesList}
          />
        )
      })()}
      <Offline>
        <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
      </Offline>
      <Pagination
        total={searchTotal}
        pagValue={searchPagValue}
        setPagValue={setSearchPagValue}
        ratedMoviesList={ratedMoviesList}
      />
    </>
  )
}
