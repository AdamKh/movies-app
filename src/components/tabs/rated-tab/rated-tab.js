import '../tab.css'

import { Offline, Online } from 'react-detect-offline'

import ItemList from '../../item-list'
import Spinner from '../../spinner'
import ErrorHandler from '../../error/error-handler'
import Pagination from '../../pagination'

const ratedMoviesListHandler = (moviesList, page = 1) => moviesList.slice(20 * (page - 1), 20 * page)

export default function RatedTab({
  isLoaded,
  error,
  ratedPagValue,
  setRatedPagValue,
  ratedTotal,
  guestSessionId,
  ratedMoviesList,
  setRatedMoviesList,
}) {
  return (
    <>
      <Online>
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

          if (ratedMoviesList.length === 0) {
            return <ErrorHandler errorDescription="Вы еще не оценили ни 1 фильм" />
          }

          return (
            <ItemList
              moviesList={ratedMoviesListHandler(ratedMoviesList, ratedPagValue)}
              guestSessionId={guestSessionId}
              ratedMoviesList={ratedMoviesList}
              setRatedMoviesList={setRatedMoviesList}
            />
          )
        })()}
      </Online>
      <Offline>
        <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
      </Offline>
      <Pagination total={ratedTotal} pagValue={ratedPagValue} setPagValue={setRatedPagValue} />
    </>
  )
}
