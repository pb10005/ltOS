<i18n>
{
  "ja": {
    "home": "ホーム",
    "apps": "アプリ一覧",
    "explorer": "エクスプローラ",
    "texteditor": "テキストエディタ",
    "diagram": "グラフ描画",
    "setting": "設定",
    "markdown": "マークダウン",
    "login": "ログイン"
  },
  "en": {
    "home": "Home",
    "apps": "Apps",
    "explorer": "Explorer",
    "texteditor": "Text Editor",
    "diagram": "Diagram Editor",
    "setting": "Settings",
    "markdown": "Markdown Editor",
    "login": "Sign In"
  }
}
</i18n>
<template>
  <v-app>
    <v-sheet
      class="overflow-hidden">
      <v-system-bar dark color="indigo darken-4">
        <v-icon @click="drawer=!drawer">mdi-menu</v-icon>
        <span>
          {{$t(app)}}
        </span>
      </v-system-bar>
      <v-container class="full-height" fluid>
        <Nuxt/>
      </v-container>
      <v-navigation-drawer
        class="mx-auto"
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
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="signOut" color="indigo" dark block>Sign out</v-btn>
          </div>
        </template>
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
  },
  methods: {
    signOut() {
      this.$store.dispatch('cloud/signOut')
      this.$router.push(this.localePath("index"))
    }
  }
}
</script>
<style>
</style>
