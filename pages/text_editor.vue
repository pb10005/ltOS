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
        <v-icon color="success" @click="overwrite" v-if="fileName">mdi-content-save</v-icon>
        <save-file-dialog @save="commit" v-if="!fileName"/>
        <v-textarea
            outlined
            :rows="30"
            v-model="content">
        </v-textarea>
    </section>
</template>
<script>
import SaveFileDialog from '@/components/SaveFileDialog'
export default {
    middleware: ['auth'],
    components: {
        SaveFileDialog
    },
    mounted() {
        this.$store.commit("app/app", "texteditor")
        this.$store.dispatch('fileSystem/getFile', {
            instanceID: this.id,
            fileID: this.fileID
        })
        .then(() => {
            if(this.file !== {}) {
                this.newName = this.file.name
                this.newContent = this.file.content
            }
        })
    },
    destroyed() {
        this.$store.commit("fileSystem/setCurrentFile", null)
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        fileID() {
            return this.$route.query.file
        },
        file() {
            return this.$store.getters['fileSystem/currentFile'] || {}
        },
        fileName: {
            get() {
                return this.file.name || ''
            },
            set(value) {
                this.newName = value
            }
        },
        content: {
            get() {
                return this.file.content || ''
            },
            set(value) {
                this.newContent = value
            }
        }
    },
    data() {
        return {
            newName: '',
            newContent: ''
        }
    },
    methods: {
        overwrite() {
            this.$store.dispatch("fileSystem/updateFile", {
                instanceID: this.id,
                fileID: this.fileID,
                name: this.newName,
                content: this.newContent
            })
        },
        commit(payload) {
            this.$store.commit("fileSystem/changeDirectory", payload.dir)
            this.$store.commit("fileSystem/createFile", {
                name: payload.fileName,
                content: this.newContent,
                instanceID: this.$route.query.id,
                parentID: payload.dir
            })
        }
    }
}
</script>
