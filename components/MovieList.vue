<template>
  <div v-if="!search" class="movie-list">
    <Movie v-for="(movie, index) in movies" :key="index" :movie="movie" />
  </div>
  <div v-else-if="search" class="movie-list">
    <Movie
      v-for="(movie, index) in searchedMovies"
      :key="index"
      :movie="movie"
    />
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