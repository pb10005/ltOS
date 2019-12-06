<i18n>
{
    "ja": {
        "email": "メールアドレス",
        "password": "パスワード"
    },
    "en": {
        "email": "Email",
        "password": "Password"
    }
}
</i18n>
<template>
    <section>
        <v-text-field v-model="email" :label="$t('email')"></v-text-field>
        <v-text-field v-model="password" type="password" :label="$t('password')"></v-text-field>
        <v-btn @click="register">{{ $t('register') }}</v-btn>
        <v-snackbar v-model="snackbar">
            {{ message }}
            <v-btn
                color="pink"
                text
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </section>
</template>
<script>
export default {
    data() {
        return {
            snackbar: false,
            message: "",
            email: "",
            password: ""
        }
    },
    methods: {
        register() {
            this.$store.dispatch("cloud/register", {
                email: this.email,
                password: this.password
            })
            .then(() => {

            })
            .catch(err => {
                this.snackbar = true
                this.message = err.message
            })
        }
    }
}
</script>