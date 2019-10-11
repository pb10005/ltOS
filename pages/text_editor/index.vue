<template>
    <section>
        エディター
        <v-textarea v-model="content">
        </v-textarea>
        <v-btn @click="$router.go(-1)">戻る</v-btn>
    </section>
</template>
<script>
export default {
    computed: {
        content: {
            get() {
                return this.$store.getters['fileSystem/currentFile'].content
            },
            set(value) {
                this.$store.dispatch("fileSystem/commitFileChanged", value)
            }
        }
    }
}
</script>