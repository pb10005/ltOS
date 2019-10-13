<i18n>
{
  "ja": {
    "filename": "ファイル名"
  },
  "en": {
    "filename": "File Name"
  }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('filename')" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
        <v-icon color="success" @click="commit">mdi-content-save</v-icon>
        <v-textarea
            outlined
            :rows="30"
            v-model="content">
        </v-textarea>
    </section>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("app/app", "texteditor")
        this.newContent = this.content
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
