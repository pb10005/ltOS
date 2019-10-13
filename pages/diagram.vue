<i18n>
{
    "ja": {
        "edit": "編集"
    },
    "en": {
        "edit": "Edit"
    }
}
</i18n>
<template>
    <section>
        <v-text-field label="File Name" v-model="fileName"></v-text-field>
        <v-icon color="secondary" @click="$router.go(-1)">mdi-arrow-left</v-icon>
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
    data() {
        return {
            fileName: '',
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
            
        }
    }
}
</script>
