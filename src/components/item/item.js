import './item.css'

import React, { useState, useEffect } from 'react'
import { Typography, Col, Flex, Rate } from 'antd'
import { format } from 'date-fns'
import classNames from 'classnames'

import { MovieAppConsumer } from '../movies-app-service-context'

const { Title } = Typography

function image(imageUrl) {
  if (imageUrl) {
    return <img alt="poster" className="movie_img" src={imageUrl} />
  }
  return (
    <Flex className="movie_img" align="center" justify="center">
      <img alt="poster" src="../../img/no-image.svg" />
    </Flex>
  )
}

function formatDate(releaseData) {
  if (releaseData) {
    return format(new Date(releaseData), 'MMMM dd, yyyy')
  }
  return 'Дата релиза неизвестна'
}

function genres(genresList, genreIds) {
  let arr = []
  if (genreIds.length) {
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

export default function Item({ id, title, text, imageUrl, releaseData, rating, voteAverage, genreIds }) {
  const [ratingStatus, setRatingStatus] = useState(rating)

  useEffect(() => {
    setRatingStatus(rating)
  }, [rating])

  const itemClassNames = classNames({
    vote_average: true,
    redBorder: voteAverage < 3,
    orangeBorder: voteAverage >= 3 && voteAverage < 5,
    yellowBorder: voteAverage >= 5 && voteAverage < 7,
    greenBorder: voteAverage >= 7,
  })

  return (
    <MovieAppConsumer>
      {({ movieService, guestSessionId, ratedMoviesList, setRatedMoviesList, genresList }) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="item">
            {image(imageUrl)}
            <div className="movie_info">
              <Title level={3} className="movie_title">
                {title}
              </Title>
              <p className="movie_date">{formatDate(releaseData)}</p>
              <Flex className="movie_genres">{genres(genresList, genreIds)}</Flex>
              <p className="movie_text">{text}</p>
              <div className="rate_wrapper">
                <Rate
                  allowHalf
                  value={ratingStatus}
                  onChange={(newRating) => {
                    setRatingStatus(newRating)

                    // Найти индекс существующего элемента в ratedMoviesList
                    const index = ratedMoviesList.findIndex((ratedMovie) => ratedMovie.id === id)

                    if (index !== -1) {
                      // Создать новый список с обновленным фильмом
                      const updatedList = [...ratedMoviesList]
                      updatedList[index] = { ...ratedMoviesList[index], rating: newRating }
                      setRatedMoviesList(updatedList)
                    } else {
                      // Если фильм не найден, добавить его в список
                      setRatedMoviesList([
                        ...ratedMoviesList,
                        { id, title, text, imageUrl, releaseData, voteAverage, rating: newRating },
                      ])
                    }

                    movieService.postRating(guestSessionId, id, newRating)
                  }}
                />
              </div>
            </div>
            <Flex className={itemClassNames} align="center" justify="center">
              {voteAverage.toFixed(1)}
            </Flex>
          </div>
        </Col>
      )}
    </MovieAppConsumer>
  )
}
