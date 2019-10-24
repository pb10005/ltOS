<i18n>
{
  "ja": {
    "local": "ローカル",
    "cloud": "クラウド",
    "login": "ログイン",
    "local_detail": "ブラウザのストレージにデータを保存します",
    "cloud_detail": "サーバーにデータを保存します"
  },
  "en": {
    "local": "Local",
    "cloud": "Cloud",
    "login": "Log in",
    "local_detail": "Save data on your computer",
    "cloud_detail": "Sava data on the server"
  }
}
</i18n>
<template>
  <section>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card shaped>
            <v-card-title>
              {{ $t('local')}}
            </v-card-title>
            <v-card-text>
              {{$t('local_detail')}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="indigo"
                @click="$router.push(localePath('apps'))">
                <v-icon>mdi-login</v-icon>
                <span>{{$t('login')}}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card shaped>
            <v-card-title>
              {{ $t('cloud') }}
            </v-card-title>
            <v-card-text>
              {{$t('cloud_detail')}}
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="indigo"
                @click="$router.push(localePath('login'))">
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
