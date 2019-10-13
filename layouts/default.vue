<i18n>
{
  "ja": {
    "home": "ホーム",
    "apps": "アプリ一覧",
    "explorer": "エクスプローラ",
    "texteditor": "テキストエディタ",
    "setting": "設定",
    "markdown": "マークダウン"
  },
  "en": {
    "home": "Home",
    "apps": "Apps",
    "explorer": "Explorer",
    "texteditor": "Text Editor",
    "setting": "Settings",
    "markdown": "Markdown Editor"
  }
}
</i18n>
<template>
  <v-app>
    <v-sheet
      class="overflow-hidden">
      <v-system-bar color="primary">
        <v-icon @click="drawer=!drawer">mdi-menu</v-icon>
        <span>
          {{$t(app)}}
        </span>
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
            @click="$router.push(localePath(item.link))"
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
    app() {
      return this.$store.getters['app/currentApp']
    },
    list() {
      return [
        {title: "home", icon: "mdi-home", link: "index"}
      ]
    } 
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
<style>
</style>