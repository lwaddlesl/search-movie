<template>
  <div class="home">
    <Header />
    <div class="search-form">
      <input
        v-model.lazy="search"
        class="search"
        placeholder="Search"
        type="text"
        @keyup.enter="enter"
      />
      <button v-show="search !== ''" class="btn" @click="clear">Clear</button>
    </div>
    <MovieList
      v-if="renderComponent"
      :movies="movies"
      :searchedMovies="searchedMovies"
      :search="search"
    />
    <div class="pagination">
      <div class="pagination__item">
        <button v-if="curPage > 1" @click="prev">prev</button>
      </div>
      <div class="pagination__item">
        {{ curPage }}
      </div>
      <div class="pagination__item">
        <button v-if="curPage != maxPages" class="next-btn" @click="next">
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      URL: `https://api.themoviedb.org/3/movie/now_playing?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US&page=1`,
      searchURL: ``,
      movies: [],
      search: '',
      searchedMovies: [],
      curPage: 1,
      renderComponent: true,
      maxPages: 0,
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
    next() {
      this.curPage++
      this.search ? (this.searchedMovies = []) : (this.movies = [])
      console.log(this.searchURL)
      this.$fetch()
    },
    prev() {
      this.search ? (this.searchedMovies = []) : (this.movies = [])
      this.curPage--
      this.$fetch()
    },
    enter() {
      if (this.search) {
        this.searchedMovies = []
      }
      this.curPage = 1
      this.$fetch()
    },
    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US&page=${this.curPage}`
      )
      const result = await data
      this.maxPages = result.data.total_pages
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
    },
    clear() {
      this.search = ''
      this.searchedMovies = []
      this.curPage = 1
    },
    async searchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US&page=${this.curPage}&query=${this.search}`
      )
      const result = await data
      this.maxPages = result.data.total_pages

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
  color: black;
  input {
    color: #000;
  }
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
    background-color: rgb(134, 89, 89);
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  .pagination__item {
    margin-right: 20px;
  }
  button {
    color: black;
    padding: 5px 15px 5px 15px;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px 19px 1px black;
    }
  }
}
</style>
