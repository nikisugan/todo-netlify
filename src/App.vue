<template>
  <v-app id="inspire">
    <v-app-bar
      app
    >
      <v-toolbar-title @click="$router.push({name: 'List'})" class="home"> Ghibli Studio Films</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.home{
  cursor: pointer;
}
</style>