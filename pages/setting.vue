<i18n>
{
    "ja": {
        "lang": "言語",
        "selectlang": "言語を選択",
        "passwd": "パスワード",
        "passwdmail": "パスワード再設定メールを送信"
    },
    "en": {
        "lang": "Language",
        "selectlang": "Select language",
        "passwd": "Password",
        "passwdmail": "Send password-reset email"
    }
}
</i18n>
<template>
    <section>
        <v-icon @click="$router.push(localePath('index'))">mdi-arrow-left</v-icon>
        <v-subheader>{{ $t('lang') }}</v-subheader>
        <v-select
            :label="$t('selectlang')"
            v-model="locale"
            item-text="state"
            item-value="abbr"
            @change="onChange"
            return-object
            :items="items">
        </v-select>
        <v-subheader>{{ $t('passwd') }}</v-subheader>
        <v-btn @click="sendMail">{{ $t('passwdmail') }}</v-btn>
    </section>
</template>
<script>
export default {
    middleware: ['auth'],
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    mounted() {
        this.$store.commit('app/app', 'setting')
    },
    data() {
        return {
            locale: {state: '', abbr: ''},
            items: [
                {state: 'English', abbr: 'en'},
                {state: '日本語', abbr: 'ja'}
            ]
        }
    },
    methods: {
        onChange() {
            this.$router.push(this.switchLocalePath(this.locale.abbr))
        },
        sendMail() {
            this.$store.dispatch("cloud/sendPasswordResetMail")
        }
    }
}
</script>
