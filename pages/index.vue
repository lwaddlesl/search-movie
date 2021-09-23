<template>
  <div class="home">
    <Header />
    <div class="search-form">
      <input
        class="search"
        v-model.lazy="search"
        placeholder="Search"
        type="text"
        @keyup.enter="$fetch"
      />
      <button v-show="search !== ''" class="btn" @click="clear">Clear</button>
    </div>
    <MovieList
      :movies="movies"
      :searchedMovies="searchedMovies"
      :search="search"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      URL: `https://api.themoviedb.org/3/movie/now_playing?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US&page=1`,
      movies: [],
      search: '',
      searchedMovies: [],
    }
  },
  async fetch() {
    if (this.search === '') {
      await this.getMovies()
      return
    }
    await this.searchMovies()
  },
  methods: {
    async getMovies() {
      const data = axios.get(this.URL)
      const result = await data
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
    },
    clear() {
      this.search = ''
      this.searchedMovies = []
    },
    async searchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US&page=1&query=${this.search}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
.search-form {
  display: flex;
  justify-content: center;
  .search {
    width: 500px;
    height: 20px;
    padding: 15px;
  }
  .btn {
    margin-left: 20px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: rgb(121, 104, 104);
  }
}
</style>
