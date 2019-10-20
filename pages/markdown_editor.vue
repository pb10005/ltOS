<i18n>
{
    "ja": {
        "content": "マークダウン文書",
        "preview": "プレビュー"
    },
    "en": {
        "content": "Content",
        "preview": "Preview"
    }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('filename')" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
        <v-icon color="success" @click="overwrite" v-if="fileName">mdi-content-save</v-icon>
        <save-file-dialog @save="commit" v-if="!fileName"/>
        <v-row>
            <v-col cols="12" sm="6">
                <v-textarea
                    :label="$t('content')"
                    :rows="10"
                    v-model="content"
                    filled />
            </v-col>
            <v-col cols="12" sm="6">
                <v-card class="pa-5" tile>
                    <v-label>{{$t('preview')}}</v-label>
                    <section v-html="render" />
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>
<script>
import marked from 'marked'
import SaveFileDialog from '@/components/SaveFileDialog'
export default {
    components: {
        SaveFileDialog
    },
    computed: {
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
        if(this.file !== {}) {
            this.newName = this.file.name || ''
            this.newContent = this.file.content || ''
        }
    },
    destroyed() {
        this.$store.commit("fileSystem/setCurrentFile", null)
    },
    data() {
        return {
            newName: '',
            newContent: ''
        }
    },
    methods: {
        overwrite() {
            this.$store.commit("fileSystem/commitFileChanged", {
                name: this.newName,
                content: this.newContent
            })
            this.$store.commit("fileSystem/save")
            this.$router.go(-1)
        },
        commit(payload) {
            this.$store.commit("fileSystem/changeDirectory", payload.dir)
            this.$store.commit("fileSystem/createFile", {
                name: payload.fileName,
                content: this.newContent
            })
            this.$store.commit("fileSystem/save")
        }
    }
}
</script>
