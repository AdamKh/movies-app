import './item.css'

import React from 'react'
import { Typography, Col, Flex, Rate } from 'antd'
import { format } from 'date-fns'

import { MovieAppConsumer } from '../movies-app-service-context'

const { Title, Text } = Typography

function image(imageUrl) {
  if (imageUrl) {
    return <img alt="poster" className="movie_img" src={imageUrl} />
  }
  return (
    <Flex className="movie_img" align="center" justify="center">
      No poster
    </Flex>
  )
}

function formatDate(releaseData) {
  if (releaseData) {
    return format(new Date(releaseData), 'MMMM dd, yyyy')
  }
  return 'Дата релиза неизвестна'
}

export default function Item({ id, title, text, imageUrl, releaseData }) {
  return (
    <MovieAppConsumer>
      {({ postRating, guestSessionId }) => (
        <Col span={12}>
          <div className="item">
            {image(imageUrl)}
            <div className="movie_info">
              <Title level={3} className="movie_title">
                {title}
              </Title>
              <p className="movie_date">{formatDate(releaseData)}</p>
              <div className="movie_genres">
                <p className="genre">Action</p>
                <p className="genre">Drama</p>
              </div>
              <Text className="movie_text">{text}</Text>
              <div className="rate_wrapper">
                <Rate allowHalf onChange={(rating) => postRating(guestSessionId, id, rating)} />
              </div>
            </div>
          </div>
        </Col>
      )}
    </MovieAppConsumer>
  )
}
