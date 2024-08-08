import './genres.css'
import { Flex } from 'antd'

function genres(genresList, genreIds) {
  let arr = []
  if (genreIds && genreIds.length) {
    arr = genreIds.map((genreId) => {
      const genre = genresList.find((genresListItem) => genresListItem.id === genreId)
      return (
        <p key={genreId} className="genre">
          {genre.name}
        </p>
      )
    })
  } else {
    arr.push(
      <p key="no-genre" className="genre">
        Без жанра
      </p>
    )
  }
  return arr
}

export default function Genres({ genresList, genreIds }) {
  return <Flex className="movie_genres">{genres(genresList, genreIds)}</Flex>
}
