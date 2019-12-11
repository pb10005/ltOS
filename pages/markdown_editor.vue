<i18n>
{
    "ja": {
        "content": "マークダウン文書",
        "preview": "プレビュー",
        "filename": "ファイル名",
        "saved": "保存しました"
    },
    "en": {
        "content": "Content",
        "preview": "Preview",
        "filename": "File Name",
        "saved": "Saved"
    }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('filename')" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
        <v-icon color="success" @click="overwrite" v-if="fileName">mdi-content-save</v-icon>
        <save-file-dialog @save="commit" v-if="!fileName"/>
        <v-icon color="indigo" @click="showPreview = !showPreview">mdi-eye</v-icon>
        <v-row>
            <v-col cols="12" v-if="!showPreview">
                <v-textarea
                    :label="$t('content')"
                    :rows="10"
                    v-model="content"
                    filled />
            </v-col>
            <v-col cols="12">
                <v-label>{{$t('preview')}}</v-label>
                <v-card class="pa-5" tile>
                    <section v-html="render" />
                </v-card>
            </v-col>
        </v-row>
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
import marked from 'marked'
import SaveFileDialog from '@/components/SaveFileDialog'
export default {
    middleware: ['auth'],
    components: {
        SaveFileDialog
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        fileID() {
            return this.$route.query.file
        },
        render() {
            return marked(this.newContent, {sanitize: true})
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
    mounted() {
        this.$store.commit("app/app", "markdown")
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
    data() {
        return {
            snackbar: false,
            message: '',
            newName: '',
            newContent: '',
            showPreview:false,
            showEditor: true
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
            .then(() => {
                this.snackbar = true
                this.message = this.$t('saved')
            })
        },
        commit(payload) {
            this.$store.commit("fileSystem/changeDirectory", payload.dir)
            this.$store.commit("fileSystem/createFile", {
                name: payload.fileName,
                content: this.newContent,
                instanceID: this.$route.query.id
            })
            this.$store.commit("fileSystem/save", this.$route.query.id || '')
        }
    }
}
</script>
