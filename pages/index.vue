<i18n>
{
  "ja": {
    "local": "ローカル",
    "cloud": "クラウド",
    "login": "ログイン"
  },
  "en": {
    "local": "Local",
    "cloud": "Cloud",
    "login": "Log in"
  }
}
</i18n>
<template>
  <section>
      <v-row>
        <v-col>
          <v-card shaped>
            <v-card-title>
              {{ $t('local')}}
            </v-card-title>
            <v-card-text>
              ブラウザのストレージにデータを保存します
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="indigo"
                @click="$router.push(localePath('local'))">
                <v-icon>mdi-login</v-icon>
                <span>{{$t('login')}}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card shaped>
            <v-card-title>
              {{ $t('cloud') }}
            </v-card-title>
            <v-card-text>
              サーバーにデータを保存します
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                disabled
                color="indigo">
                <v-icon>mdi-login</v-icon>
                <span>{{$t('login')}}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import IconLink from '~/components/IconLink.vue'

export default {
  components: {
    Logo,
    IconLink
  },
  mounted() {
    this.$store.commit('app/app', 'home')
  }
}
</script>

<style scoped>
</style>
