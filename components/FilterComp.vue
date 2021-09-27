<template>
  <select :value="selectFilter" class="filter-movie" @change="updateFilter">
    <option disabled value="">Please select one</option>
    <option value="popular">popular</option>
    <option value="top_rated">top rated</option>
    <option value="upcoming">upcoming</option>
  </select>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      selectFilter: (state) => state.selectFilter,
    }),
  },
  methods: {
    ...mapActions(['getMovies']),
    updateFilter(e) {
      this.$store.commit('updateFilter', e.target.value)
      this.getMovies()
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-movie {
  color: black;
  * {
    color: black;
  }
}
</style>