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
      <v-system-bar app dark color="indigo darken-4">
        <span>
          {{$t(app)}}
        </span>
      </v-system-bar>
    <v-sheet
      class="overflow-hidden">
        <v-navigation-drawer
          v-model="drawer"
          app
          mini-variant
          clipped-left
          permanent>
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
            <v-list-item @click="signOut">
                <v-list-item-icon>
                    <v-icon color="indigo accent-4">mdi-logout</v-icon>
                </v-list-item-icon>
            </v-list-item>
          </template>
        </v-navigation-drawer>
        <v-content class="full-height ma-2">
          <Nuxt/>
        </v-content>
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
