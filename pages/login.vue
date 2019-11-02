<i18n>
{
    "ja": {
        "email": "メールアドレス",
        "password": "パスワード"
    },
    "en": {
        "email": "E-mail",
        "password": "Password"
    }
}
</i18n>
<template>
    <section>
        <v-form>
            <v-text-field v-model="email" :label="$t('email')" />
            <v-text-field v-model="password" type="password" :label="$t('password')"/>
            <v-btn color="indigo" dark @click="submit">Submit</v-btn>
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
            password: ''
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('cloud/auth', {
                email: this.email,
                password: this.password
            })
            this.$router.push(this.localePath('dashboard'))
        }
    }
}
</script>
