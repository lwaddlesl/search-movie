<template>
  <div v-if="!search && !$store.state.isMoviesLoading" class="movie-list">
    <Movie v-for="(movie, index) in movies" :key="index" :movie="movie" />
  </div>
  <div v-else-if="search && !$store.state.isMoviesLoading" class="movie-list">
    <Movie
      v-for="(movie, index) in searchedMovies"
      :key="index"
      :movie="movie"
    />
    <div
      v-if="$store.state.maxPages == 0"
      style="margin-top: 20px; font-size: 46px"
    >
      Empty
    </div>
  </div>
  <div v-else-if="$store.state.isMoviesLoading">
    <Loading />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  async fetch() {
    await this.getMovies()
  },
  computed: {
    ...mapState(['movies', 'search', 'searchedMovies']),
  },

  mounted() {
    if (this.$route.query.page) {
      this.$store.commit('setPage', this.$route.query.page)
    }
    this.getMovies()
  },

  methods: {
    ...mapActions(['getMovies']),
  },
}
</script>

<style lang="scss" scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>