import './item-list.css'
import { Row } from 'antd'

import Item from '../item'
import { MovieAppConsumer } from '../movies-app-service-context'

export default function ItemList({ moviesList }) {
  return (
    <MovieAppConsumer>
      {({ ratedMoviesList }) => (
        <Row className="item-list" gutter={[36, 36]}>
          {moviesList.map((movie) => (
            <Item
              id={movie.id}
              title={movie.title}
              text={movie.text}
              key={movie.id}
              imageUrl={movie.imageUrl}
              releaseData={movie.releaseData}
              rating={(ratedMoviesList.find((ratedMovie) => ratedMovie.id === movie.id) || {}).rating}
            />
          ))}
        </Row>
      )}
    </MovieAppConsumer>
  )
}
