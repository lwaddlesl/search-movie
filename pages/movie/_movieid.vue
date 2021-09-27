<template>
  <div class="about-movie">
    <div class="left">
      <nuxt-link :to="{ name: 'index' }">
        <div class="back">Back</div>
      </nuxt-link>

      <div class="img">
        <img
          :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
          :alt="movie.title"
        />
      </div>
    </div>
    <div class="discription">
      <h1 class="title">
        {{ movie.title }}
      </h1>
      <h2>About movie</h2>
      <div class="discription__item">
        <span class="brown-title">Genres:</span>
        <p v-for="(g, index) in genres" :key="index" class="genres">
          {{ g + ' ' }}
        </p>
      </div>
      <div class="discription__item">
        <span class="brown-title">Overview:</span>
        {{ movie.overview }}
      </div>
      <div v-if="movie.homepage" class="discription__item">
        <span class="brown-title">Homepage:</span>
        <a class="homepage" :href="movie.homepage">
          {{ movie.homepage }}
        </a>
      </div>
      <div class="discription__item">
        <span class="brown-title">release date:</span>
        {{ movie.release_date }}
      </div>
      <div class="discription__item">
        <span class="brown-title">vote_average:</span>
        {{ movie.vote_average }}
      </div>
      <div v-if="movie.tagline" class="discription__item">
        <span class="brown-title"> tagline:</span>
        {{ movie.tagline }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AboutMovie',
  data() {
    return {
      movie: '',
      genres: [],
    }
  },
  async fetch() {
    await this.getSingleMovie()
  },
  head() {
    return {
      title: this.movie.title,
    }
  },
  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      )
      const result = await data
      this.movie = result.data
      this.movie.genres.forEach((g) => this.genres.push(g.name))
    },
  },
}
</script>

<style lang="scss" scoped>
.about-movie {
  display: flex;
  padding: 20px;
  justify-content: center;
  font-size: 18px;
  .back {
    margin-bottom: 20px;
    width: 50px;
    height: 20px;
    padding: 5px;
    background-color: rgb(218, 134, 134);
    &:hover {
      box-shadow: 1px 1px 19px 1px black;
    }
  }
  .homepage {
    color: rgb(207, 207, 207);
    &:hover {
      color: rgb(88, 200, 228);
    }
  }
  .genres {
    display: inline;
    color: rgb(207, 207, 207);
  }
  .discription {
    background-color: rgb(80, 80, 80);
    display: flex;
    flex-direction: column;
    margin: 20px;
    margin-top: 50px;
    padding-left: 40px;
    width: 700px;
    min-height: 450px;
    .discription__item {
      color: rgb(207, 207, 207);
      margin-top: 10px;
    }
    .title {
      margin: 20px;
      text-align: center;
    }
    h2 {
      margin-left: 80px;
      margin-bottom: 20px;
    }
    .brown-title {
      color: rgb(114, 37, 37);
    }
  }
}
</style>