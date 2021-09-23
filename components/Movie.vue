<template>
  <div class="movie">
    <nuxt-link
      class="movie-link"
      :to="{ name: 'movie-movieid', params: { movieid: movie.id } }"
    >
      <h3 class="title">{{ movie.title }}</h3>
      <img
        :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
        alt=""
      />
      <div class="overview">
        <p class="overview__item">{{ movie.overview.slice(0, 160) }}</p>
        <p v-if="movie.overview.length > 159">.....</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
}
</script>

<style lang="scss" scoped>
.movie-link {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 650px;
  margin: 15px;
  position: relative;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgb(122, 122, 122);
  box-shadow: 1px 1px 29px 2px black;
  p {
    font-size: 18px;
    display: inline;
  }
  .overview {
    margin: auto;
    display: inline;
  }
  h3 {
    margin: auto;
  }
  img {
    width: 300px;
    transition: all 0.5s;
  }
  &:hover {
    cursor: pointer;
    img {
      width: 330px;
    }
  }
}
</style>