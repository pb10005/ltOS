<template>
  <v-app>
    <v-sheet
      class="overflow-hidden">
      <v-system-bar color="primary">
        <v-icon @click="drawer=!drawer">mdi-menu</v-icon>
      </v-system-bar>
      <v-container class="full-height" fluid>
        <Nuxt/>
      </v-container>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
        <v-list dense>
          <v-list-item
            v-for="item in list"
            :key="item.title"
            link
            @click="$router.push(item.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
</template>
<script>
export default {
  computed: {
    list() {
      return [
        {title: "home", icon: "mdi-home", link: "/"}
      ]
    } 
  },
  data() {
    return {
      drawer: true
    }
  }
}
</script>
<style>
</style>