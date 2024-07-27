class MoviesService {
  #apiBase = 'https://api.themoviedb.org'

  // #apiKey = '17f5f189e6a1521e9371c3f365ec176b'

  // eslint-disable-next-line operator-linebreak
  #token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzc5MzRmYTgxMzM5NWYzNWUxNjA5ZDc2YzVkOTFhZSIsIm5iZiI6MTcyMjAwMjYzMi45ODA2NTIsInN1YiI6IjY2YTEzNjYzYTlmOGZhNTkzZjUyOWY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ujUVTz1cBm_tFQRSSVmoMr8MhYDzfqY1ISYQSidhKa0'

  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.#token}`,
    },
  }

  async getResource(url) {
    const res = await fetch(`${this.#apiBase}${url}`, this.#options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return res.json()
  }

  getMovies() {
    return this.getResource('/3/search/movie?include_adult=false&language=en-US&page=1&query=return')
  }
}

const movieService = new MoviesService()
movieService.getMovies().then((res) => console.log(res))
