<i18n>
{
    "ja": {
        "addins": "インスタンスを追加"
    },
    "en": {
        "addins": "Add Instance"
    }
}
</i18n>
<template>
    <section>
        <p>{{ currentUser.displayName }}</p>
        <v-btn>
            <v-icon>mdi-plus</v-icon>
            <span>{{ $t('addins') }}</span>
        </v-btn>
        <v-list>
            <v-list-item v-for="(item, index) in fss" :key="index" @click="openFS(item)">
                <span>{{ item.name }}</span>
                <v-divider v-if="index < fss.length - 1" />
            </v-list-item>
        </v-list>
    </section>
</template>
<script>
import { auth } from 'firebase'
export default {
    mounted() {
        if(!auth().currentUser) {
            this.$router.push(this.localePath('login'))
        }
        this.$store.dispatch('cloud/getFSsByUsername')
        this.$store.dispatch('cloud/getCurrentUser')
    },
    computed: {
        currentUser() {
            return this.$store.getters['cloud/currentUser']
        },
        fss() {
            return this.$store.getters['cloud/fss']
        }
    },
    methods: {
        openFS(item) {
            this.$store.commit('fileSystem/setCurrentID', {id: item.id, name: item.name})
            this.$store.dispatch('fileSystem/getFS', {
                id: item.id,
                name: item.name
            })
            this.$router.push(this.localePath('apps') + `?id=${item.id}`)
        }
    }
}
</script>
