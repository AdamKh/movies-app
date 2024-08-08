import './item.css'

import React from 'react'
import { Typography, Col, Flex } from 'antd'
import classNames from 'classnames'

import { MovieAppConsumer } from '../movies-app-service-context'
import Genres from '../genres'
import ItemImage from '../item-image'
import ItemRate from '../item-rate'
import MovieDate from '../item-date'

const { Title } = Typography

export default function Item({
  id,
  title,
  text,
  imageUrl,
  releaseData,
  rating,
  voteAverage,
  genreIds,
  guestSessionId,
  ratedMoviesList,
  setRatedMoviesList,
}) {
  const itemClassNames = classNames({
    vote_average: true,
    redBorder: voteAverage < 3,
    orangeBorder: voteAverage >= 3 && voteAverage < 5,
    yellowBorder: voteAverage >= 5 && voteAverage < 7,
    greenBorder: voteAverage >= 7,
  })

  return (
    <MovieAppConsumer>
      {({ genresList }) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="item">
            <ItemImage imageUrl={imageUrl} />
            <div className="movie_info">
              <Title level={3} className="movie_title">
                {title}
              </Title>
              <MovieDate releaseData={releaseData} />
              <Genres genresList={genresList} genreIds={genreIds} />
              <p className="movie_text">{text}</p>
              <ItemRate
                key={id}
                id={id}
                title={title}
                text={text}
                imageUrl={imageUrl}
                releaseData={releaseData}
                rating={rating}
                voteAverage={voteAverage}
                genreIds={genreIds}
                guestSessionId={guestSessionId}
                ratedMoviesList={ratedMoviesList}
                setRatedMoviesList={setRatedMoviesList}
              />
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
