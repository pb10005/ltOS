<template>
  <section>
      <div class="links">
        <NLink to="/about">About</NLink>
      </div>

      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
            ローカル
            </v-card-title>
            <v-card-text>
              ブラウザのストレージにデータを保存します
            </v-card-text>
            <v-card-actions>
              <v-btn @click="$router.push('/local')">ログイン</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
            クラウド
            </v-card-title>
            <v-card-text>
              サーバーにデータを保存します
            </v-card-text>
            <v-card-actions>
              <v-btn>ログイン</v-btn>
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
  }
}
</script>

<style scoped>
</style>
