<template>
    <section>
        <v-btn>
            <v-icon>mdi-plus</v-icon>
            <span>Add Item</span>
        </v-btn>
        <div v-for="(item, index) in fss" :key="index">
            <v-btn @click="openFS(item)">{{ item.name }}</v-btn>
        </div>
    </section>
</template>
<script>
export default {
    mounted() {
        // this.$store.dispatch('cloud/getFSsByUsername')
    },
    computed: {
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
