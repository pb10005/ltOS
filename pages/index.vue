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
        <v-card outlined>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{ currentUser.displayName }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-btn @click="$router.push(localePath('add_instance'))">
            <v-icon>mdi-plus</v-icon>
            <span>{{ $t('addins') }}</span>
        </v-btn>
        <v-list>
            <div v-for="(item, index) in fss" :key="index" >
                <v-list-item @click="openFS(item)">
                    <v-text>{{ item.name }}</v-text>
                </v-list-item>
                <v-divider v-if="index < fss.length - 1" />
            </div>
        </v-list>
    </section>
</template>
<script>
import { auth } from 'firebase'
export default {
    middleware: ['auth'],
    mounted() {
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
                id: item.id
            })
            this.$router.push(this.localePath('apps') + `?id=${item.id}`)
        }
    }
}
</script>
