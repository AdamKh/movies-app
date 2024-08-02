import '../app.css'

import { Offline, Online } from 'react-detect-offline'

import ItemList from '../../item-list'
import Spinner from '../../spinner'
import ErrorHandler from '../../error/error-handler'
import EmptyQuery from '../../error/empty-query'
import Pagination from '../../pagination'
import { MovieAppConsumer } from '../../movies-app-service-context'

const ITEMS_PER_PAGE = 20 // Количество фильмов на странице

export default function SearchTab() {
  return (
    <div className="section">
      <MovieAppConsumer>
        {({ ratedMoviesList, isLoaded, error, pagValue }) => (
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

                const startIndex = (pagValue - 1) * ITEMS_PER_PAGE
                const endIndex = startIndex + ITEMS_PER_PAGE

                const currentPageMovies = ratedMoviesList.slice(startIndex, endIndex)

                return <ItemList moviesList={currentPageMovies} />
              })()}
            </Online>
            <Offline>
              <ErrorHandler errorMessage="Проверьте подключение к сети" errorDescription="Ноу интернет коннектион" />
            </Offline>
            <Pagination total={ratedMoviesList.length} />
          </>
        )}
      </MovieAppConsumer>
    </div>
  )
}
