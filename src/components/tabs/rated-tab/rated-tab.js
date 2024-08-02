import '../app.css'

import { Offline, Online } from 'react-detect-offline'

import ItemList from '../../item-list'
import Spinner from '../../spinner'
import ErrorHandler from '../../error/error-handler'
import EmptyQuery from '../../error/empty-query'
import Pagination from '../../pagination'
import { MovieAppConsumer } from '../../movies-app-service-context'

export default function SearchTab() {
  return (
    <div className="section">
      <MovieAppConsumer>
        {({ ratedMoviesList, isLoaded, error }) => (
          <>
            <Online>
              {(() => {
                if (!isLoaded) {
                  return <Spinner />
                }

                if (error.isError) {
                  return <ErrorHandler errorMessage={error.errorMessage} errorDescription={error.errorDescription} />
                }

                if (ratedMoviesList.length === 0) {
                  return <EmptyQuery errorDescription="Вы еще не оценили ни 1 фильм" />
                }

                return <ItemList moviesList={ratedMoviesList} />
              })()}
            </Online>
            <Offline>
              <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
            </Offline>
            {/* <button
              type="button"
              onClick={() =>
                movieService
                  .getRated(localStorage.getItem('guest_session_id'))
                  .then((ratedmov) => console.log(ratedmov))
              }
            >
              button
            </button> */}
            <Pagination />
          </>
        )}
      </MovieAppConsumer>
    </div>
  )
}
