<i18n>
{
    "ja": {
        "email": "メールアドレス",
        "password": "パスワード",
        "login": "ログイン"
    },
    "en": {
        "email": "E-mail",
        "password": "Password",
        "login": "Sign In"
    }
}
</i18n>
<template>
    <section>
        <p>{{error}}</p>
        <v-form @submit.prevent="submit">
            <v-text-field v-model="email" :label="$t('email')" />
            <v-text-field v-model="password" type="password" :label="$t('password')"/>
            <v-btn color="indigo" type="submit" dark>{{$t('login')}}</v-btn>
        </v-form>
    </section>
</template>
<script>
import { auth } from 'firebase'
export default {
    mounted() {
        this.$store.commit('app/app', 'login')
    },
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('cloud/auth', {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push(this.localePath('dashboard'))
            })
            .catch(() => {
                this.error = 'failed'
            })
        }
    }
}
</script>
