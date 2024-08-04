export default class MoviesService {
  #apiBase = 'https://api.themoviedb.org'

  #apiImageBase = 'https://image.tmdb.org/t/p/w500'

  #apiKey = '337934fa813395f35e1609d76c5d91ae'

  #token =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzc5MzRmYTgxMzM5NWYzNWUxNjA5ZDc2YzVkOTFhZSIsIm5iZiI6MTcyMjc2MjcyMC4yMjI1MzQsInN1YiI6IjY2YTEzNjYzYTlmOGZhNTkzZjUyOWY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tq4RS7dQYvbm_CxxaCuU_7tKrOSDdDjskXp74eQjTKo'

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
      throw new Error(`Не удалось получить ${url}, статус: ${res.status}`)
    }
    return res.json()
  }

  getMovies(query, page) {
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

  getRatedPage(guestSessionId, page) {
    return this.getResource(`/3/guest_session/${guestSessionId}/rated/movies?api_key=${this.#apiKey}&page=${page}`)
  }

  async getAllRatedMovies(guestSessionId) {
    const allMovies = []
    let page = 1
    let totalPages = 1
    let totalResults = 1

    while (page <= totalPages) {
      // eslint-disable-next-line no-await-in-loop
      const data = await this.getRatedPage(guestSessionId, page)

      allMovies.push(...data.results)
      totalPages = data.total_pages
      totalResults = data.total_results
      page += 1
    }

    return { allMovies, totalResults }
  }
}
