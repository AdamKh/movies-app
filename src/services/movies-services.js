export default class MoviesService {
  #apiBase = 'https://api.themoviedb.org'

  #apiImageBase = 'https://image.tmdb.org/t/p/w500'

  #apiKey = '337934fa813395f35e1609d76c5d91ae'

  // eslint-disable-next-line operator-linebreak
  #token =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzc5MzRmYTgxMzM5NWYzNWUxNjA5ZDc2YzVkOTFhZSIsIm5iZiI6MTcyMjM2OTIxMi42NzM5ODksInN1YiI6IjY2YTEzNjYzYTlmOGZhNTkzZjUyOWY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCY2pq97aWb-PyzRNsWi0CXI2b9q8RR-pqv1XHObjzQ'

  async getResource(url, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.#token}`,
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const res = await fetch(`${this.#apiBase}${url}`, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return res.json()
  }

  async getMovies(query, page) {
    return this.getResource(
      `/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}&api_key=${this.#apiKey}`
    )
  }

  getImage(posterPath) {
    return posterPath ? `${this.#apiImageBase}${posterPath}` : null
  }

  createSessionId() {
    return this.getResource('/3/authentication/guest_session/new')
  }

  postRating(guestSessionId, movieId, rating) {
    return this.getResource(`/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, 'POST', { value: rating })
  }

  getRated(guestSessionId) {
    return this.getResource(`/3/guest_session/${guestSessionId}/rated/movies?api_key=${this.#apiKey}`)
  }
}
