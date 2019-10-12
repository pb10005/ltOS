<template>
    <section>
        <v-text-field label="File Name" v-model="fileName"></v-text-field>
        <v-textarea
            outlined
            :rows="30"
            v-model="content">
        </v-textarea>
        <v-btn class="success" @click="commit">Save</v-btn>
        <v-btn class="secondary" @click="$router.go(-1)">Cancel</v-btn>
    </section>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("app/app", "texteditor")
    },
    computed: {
        fileName() {
            return this.$store.getters['fileSystem/currentFile'].name
        },
        content: {
            get() {
                return this.$store.getters['fileSystem/currentFile'].content
            },
            set(value) {
                this.newContent = value
            }
        }
    },
    data() {
        return {
            newContent: ''
        }
    },
    methods: {
        commit() {
            this.$store.commit("fileSystem/commitFileChanged", this.newContent)
            this.$store.commit("fileSystem/save")
            this.$router.go(-1)
        }
    }
}
</script>