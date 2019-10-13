<i18n>
{
    "ja": {
        "lang": "言語"
    },
    "en": {
        "lang": "Language"
    }
}
</i18n>
<template>
    <section>
        <v-icon @click="$router.push(localePath('local'))">mdi-arrow-left</v-icon>
        <v-select
            :label="$t('lang')"
            v-model="locale"
            item-text="state"
            item-value="abbr"
            @change="onChange"
            return-object
            :items="items">
        </v-select>
    </section>
</template>
<script>
export default {
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
        }
    }
}
</script>
