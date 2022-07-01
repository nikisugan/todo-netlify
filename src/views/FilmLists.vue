<template>
            <div>
          <v-row>
            <v-col
              v-for="film in calculateFilms"
              :key="film.id"
              cols="12"
            >
              <v-card
                class="mx-auto my-12"
                max-width="600"
                @click="$router.push({name: 'Film', params: { id: film.id }})"
              >
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <v-img
                  height="250"
                  :src="film.image"
                ></v-img>

                <v-card-title>{{ `${film.original_title} - ${film.original_title_romanised} - ${film.title}` }}</v-card-title>

                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-rating
                      :value="round(((film.rt_score)/20) ,1)"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                      {{round(((film.rt_score)/20) ,1)}}
                    </div>
                  </v-row>

                  <div class="my-4 text-subtitle-1">
                    <strong> {{ `${film.release_date} - ${film.running_time} mins` }}</strong>
                  </div>

                  <div>{{film.description}} </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
              </v-card>
            </v-col>
          </v-row>
          <v-pagination
            v-model="page"
            class="my-4"
            :length="pages"
            @input="updatePage"
          >
          </v-pagination>
        </div>
</template>

<script>

import axios from 'axios'
const url = 'https://ghibliapi.herokuapp.com/'
  export default {
    data: () => ({
      films:[],
      page: 1,
      pageSize: 4,
      listCount: 0,
      calculateFilms: [],
    }),
    computed: {
      pages() {
        if (this.pageSize == null || this.listCount == null) return 0;
        return Math.ceil(this.listCount / this.pageSize);
		}
    },

    methods: {
      initPage: function() {
        this.listCount = this.films.length;
        if (this.listCount < this.pageSize) {
          this.historyList = this.films;
        } else {
          this.historyList = this.films.slice(0, this.pageSize);
        }
      },
      fetchFilm(){
        axios.get(url+'films')
        .then(response => {
          // console.log('response', response.data)
          this.films = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() =>{
          this.initPage()
          this.updatePage(this.page);
        })
      },
      round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
      },
      updatePage(pageIndex) {
        let start = (pageIndex - 1) * this.pageSize;
        let end = pageIndex * this.pageSize;
        this.calculateFilms = this.films.slice(start, end);
        this.page = pageIndex;
		}
    },
    created() {
      this.fetchFilm()
    },
  }
</script>