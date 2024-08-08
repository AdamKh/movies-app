import './item-rate.css'

import React, { useState, useEffect } from 'react'
import { Rate } from 'antd'

import { MovieAppConsumer } from '../movies-app-service-context'

export default function ItemRate({
  id,
  title,
  text,
  imageUrl,
  releaseData,
  rating,
  voteAverage,
  guestSessionId,
  ratedMoviesList,
  setRatedMoviesList,
}) {
  const [ratingStatus, setRatingStatus] = useState(rating)

  useEffect(() => {
    setRatingStatus(rating)
  }, [rating])

  return (
    <MovieAppConsumer>
      {({ postRating }) => (
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

              postRating(guestSessionId, id, newRating)
            }}
          />
        </div>
      )}
    </MovieAppConsumer>
  )
}
