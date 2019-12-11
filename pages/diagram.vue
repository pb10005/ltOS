<i18n>
{
    "ja": {
      "filename": "ファイル名",
        "edit": "編集",
        "saved": "保存しました"
    },
    "en": {
      "filename": "File Name",
        "edit": "Edit",
        "saved": "Saved"
    }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('filename')" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
        <v-icon color="success" @click="overwrite" v-if="fileName">mdi-content-save</v-icon>
        <save-file-dialog @save="commit" v-if="!fileName" />
        <v-card tile color="gray lighten-4" class="scroll pa-3">
            <diagram-editor v-model="graph"/>
        </v-card>
        <v-footer app><span>Powered by:</span><a target="_blank" href="https://github.com/pb10005/diagram-vue">diagram-vue</a></v-footer>
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
import { DiagramEditor } from "diagram-vue"
import SaveFileDialog from '@/components/SaveFileDialog'
import "diagram-vue/dist/diagram.css";
export default {
    middleware: ['auth'],
    components: {
        DiagramEditor,
        SaveFileDialog
    },
    mounted() {
        this.$store.commit("app/app", "diagram")
        this.$store.dispatch('fileSystem/getFile', {
            instanceID: this.id,
            fileID: this.fileID
        })
        .then(() => {
            if(this.file !== {}) {
                if(this.file !== {}) {
                    this.newName = this.file.name || ''
                    try {
                        this.graph = JSON.parse(this.file.content) || ''
                    } catch (err) {
                        console.log('Error parsing json')
                    }
                }
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
        }
    },
    data() {
        return {
            snackbar: false,
            message: '',
            newname: '',
            graph :{
                width: 1000,
                height: 600,
                background: "#FFFFFF",
                nodes: [],
                links: []
            }
        }
    },
    methods: {
        commit(payload) {
            const content = JSON.stringify(this.graph)
            this.$store.commit("fileSystem/changeDirectory", payload.dir)
            this.$store.commit("fileSystem/createFile", {
                name: payload.fileName,
                content: content,
                instanceID: this.$route.query.id
            })
            this.$store.commit("fileSystem/save", this.$route.query.id || '')
            
        },
        overwrite() {
            const content = JSON.stringify(this.graph)
            this.$store.dispatch("fileSystem/updateFile", {
                instanceID: this.id,
                fileID: this.fileID,
                name: this.newName,
                content: content
            })
            .then(() => {
                this.snackbar = true
                this.message = this.$t('saved')
            })
        }
    }
}
</script>
<style scoped>
.scroll {
    overflow: scroll;
}
</style>
