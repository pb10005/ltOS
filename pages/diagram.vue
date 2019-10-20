<i18n>
{
    "ja": {
      "filename": "ファイル名",
        "edit": "編集"
    },
    "en": {
      "filename": "File Name",
        "edit": "Edit"
    }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('filename')" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
        <v-icon color="success" @click="overwrite" v-if="fileName">mdi-content-save</v-icon>
        <save-file-dialog @save="commit" v-if="!fileName" />
        <v-card tile color="indigo lighten-4" class="pa-3">
            <diagram-editor v-model="graph"/>
        </v-card>
        <v-footer fixed><span>Powered by:</span><a target="_blank" href="https://github.com/pb10005/diagram-vue">diagram-vue</a></v-footer>
    </section>
</template>
<script>
import { DiagramEditor } from "diagram-vue"
import SaveFileDialog from '@/components/SaveFileDialog'
import "diagram-vue/dist/diagram.css";
export default {
    components: {
        DiagramEditor,
        SaveFileDialog
    },
    mounted() {
        this.$store.commit("app/app", "diagram")
        if(this.file !== {}) {
            this.newName = this.file.name || ''
            try {
                this.graph = JSON.parse(this.file.content) || ''
            } catch (err) {
                console.log('Error parsing json')
            }
        }
    },
    computed: {
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
                content: content
            })
            this.$store.commit("fileSystem/save")
            
        },
        overwrite() {
            this.$store.commit("fileSystem/commitFileChanged", {
                name: this.newName,
                content: JSON.stringify(this.graph)
            })
            this.$store.commit("fileSystem/save")
            this.$router.go(-1)
        }
    }
}
</script>
