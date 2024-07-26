const getResource = async (url) => {
  const res = await fetch(url).json
  const body = await res.json
  return body
}

getResource('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1').then((body) => {
  console.log(body)
})
