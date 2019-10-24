<template>
    <section>
        <v-btn>
            <v-icon>mdi-plus</v-icon>
            <span>Add Item</span>
        </v-btn>
        <div v-for="(item, index) in fss" :key="index">
            <v-btn @click="openFS(item.id)">{{ item.id }}</v-btn>
        </div>
    </section>
</template>
<script>
export default {
    mounted() {
        this.$store.dispatch('cloud/getFSsByUsername')
    },
    computed: {
        fss() {
            return this.$store.getters['cloud/fss']
        }
    },
    methods: {
        openFS(id) {
            this.$store.commit('fileSystem/setCurrentID', {id})
            this.$store.dispatch('fileSystem/getFS', {
                id: id
            })
            this.$router.push(this.localePath('apps') + `?id=${id}`)
        }
    }
}
</script>
