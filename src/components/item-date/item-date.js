import './item-date.css'

import React from 'react'

import { formatDate } from '../../utils'

export default function MovieDate({ releaseData }) {
  return <p className="movie_date">{formatDate(releaseData)}</p>
}
