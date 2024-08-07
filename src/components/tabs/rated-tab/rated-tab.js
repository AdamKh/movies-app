import '../tab.css'

import { Offline, Online } from 'react-detect-offline'

import ItemList from '../../item-list'
import Spinner from '../../spinner'
import ErrorHandler from '../../error/error-handler'
import EmptyQuery from '../../error/empty-query'
import Pagination from '../../pagination'
import { MovieAppConsumer } from '../../movies-app-service-context'

const ratedMoviesListHandler = (moviesList, page = 1) => moviesList.slice(20 * (page - 1), 20 * page)

export default function RatedTab() {
  return (
    <MovieAppConsumer>
      {({ ratedMoviesList, isLoaded, error, ratedPagValue, setRatedPagValue, ratedTotal }) => (
        <>
          <Online>
            {(() => {
              if (!isLoaded) {
                return <Spinner />
              }

              if (error.isError) {
                return <ErrorHandler errorMessage={error.errorMessage} errorDescription={error.errorDescription} />
              }

              if (!ratedMoviesList) {
                return <EmptyQuery errorDescription="Вы еще не оценили ни 1 фильм" />
              }

              return <ItemList moviesList={ratedMoviesListHandler(ratedMoviesList, ratedPagValue)} />
            })()}
          </Online>
          <Offline>
            <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
          </Offline>
          <Pagination total={ratedTotal} pagValue={ratedPagValue} setPagValue={setRatedPagValue} />
        </>
      )}
    </MovieAppConsumer>
  )
}
