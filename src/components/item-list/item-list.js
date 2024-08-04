import './item-list.css'
import { Row } from 'antd'

import Item from '../item'

export default function ItemList({ moviesList }) {
  return (
    <Row className="item-list" gutter={[36, 36]}>
      {moviesList.map((movie) => (
        <Item
          id={movie.id}
          title={movie.title}
          text={movie.text}
          key={movie.id}
          imageUrl={movie.imageUrl}
          releaseData={movie.releaseData}
          rating={movie.rating}
          voteAverage={movie.voteAverage}
        />
      ))}
    </Row>
  )
}
