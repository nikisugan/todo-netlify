<template>
            <div>
          <v-row>
            <v-col
              cols="12"
            >
              <v-card
                class="mx-auto my-12"
                max-width="600"
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
                  :src="film.movie_banner"
                ></v-img>

                <v-card-title>{{ `${film.original_title} - ${film.original_title_romanised} - ${film.title}` }}</v-card-title>

                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                  <v-col cols="8">
                    <div class="d-flex">
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
                    </div>
                    
                  <div class="my-4 text-subtitle-1">
                    <strong> {{ `${film.release_date} - ${film.running_time} mins` }}</strong>
                  </div>
                  </v-col>
                  <v-col cols="4">
                    <v-card>
                  <v-img
                  contain
                  max-height="125"
                  :src="film.image"
                  class="float-right"
                  >
                  </v-img>
                    </v-card>
                  </v-col>
                  </v-row>

                  <div>{{film.description}} </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
              </v-card>
            </v-col>
          </v-row>
        </div>
</template>

<script>

import axios from 'axios'
const url = 'https://ghibliapi.herokuapp.com/'
  export default {
    data: () => ({
      film:{},
    }),
    methods: {
      fetchFilm(){
        // console.log(this.$route.params.id)
        const id = this.$route.params.id
        axios.get(url+'films/'+id)
        .then(response => {
          console.log('response', response.data)
          this.film = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() =>{
        })
      },
      round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
      },
    },
    created() {
      this.fetchFilm()
    },
  }
</script>