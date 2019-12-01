<i18n>
{
    "ja": {
      "apps": "アプリ一覧",
      "explorer": "エクスプローラ",
      "save": "保存",
        "path": "パス",
      "trash": "ごみ箱"
    },
    "en": {
      "apps": "Apps",
      "explorer": "Explorer",
      "save": "Save",
      "path": "Path",
      "trash": "Trash Bin"
    }
}
</i18n>
<template>
  <section>
    <v-text-field :label="$t('path')" v-model="path"></v-text-field>
    <v-icon @click="up">mdi-arrow-up</v-icon>
    <create-directory-dialog @ok="createDirectory" />
    <create-file-dialog @ok="createFile" />
    <remove-node-dialog :dialog='removeFileDialog' @ok="removeFile" @cancel="removeFileDialog=false"/>
    <remove-node-dialog :dialog='removeDirectoryDialog' @ok="removeDirectory" @cancel="removeDirectoryDialog=false"/>
    <node-list
      :nodes="nodes"
      @changeDirectory="changeDirectory"
      @removeDirectory="(item) => {removeCandidate=item; removeDirectoryDialog = true}"
      @openFile="openFile"
      @removeFile="(item) => {removeCandidate=item; removeFileDialog = true}"/>
    <v-btn color="indigo" dark @click="$router.push(localePath('apps') + `?id=${id}`)">{{ $t('apps') }}</v-btn>
  </section>
</template>
<script>
import CreateDirectoryDialog from '@/components/CreateDirectoryDialog'
import CreateFileDialog from '@/components/CreateFileDialog'
import RemoveNodeDialog from '@/components/RemoveNodeDialog'
import NodeList from '@/components/NodeList'
import { auth } from 'firebase'
export default {
  middleware: ['auth'],
  components: {
    CreateDirectoryDialog,
    CreateFileDialog,
    RemoveNodeDialog,
    NodeList
  },
  mounted() {
    this.$store.commit("app/app", "explorer")
    this.fetchNodes()
  },
  computed: {
    nodes() {
      return this.$store.getters["fileSystem/currentDirectory"]
    },
    id() {
      return this.$route.query.id || ''
    },
    dirID() {
        return this.$route.query.dir || 'root'
    }
  },
  watch: {
      $route() {
          this.fetchNodes()
      }
  },
  data() {
      return {
          path: '',
          removeFileDialog: false,
          removeDirectoryDialog: false,
          removeCandidate: null
      }
  },
  methods: {
    fetchNodes() {
        this.$store.dispatch("fileSystem/fetchNodesByParentID", {
            instanceID: this.id,
            dirID: this.dirID
        })
        this.$store.dispatch("fileSystem/getNode", {
            instanceID: this.id,
            nodeID: this.dirID
        })
        .then(node => {
            this.path = node.name
        })
        .catch(() => {
            this.path = 'root'
        })
    },
    up() {
        if(this.dirID === 'root') return
        this.$store.dispatch("fileSystem/getNode", {
            instanceID: this.id,
            nodeID: this.dirID
        })
        .then(node => {
            if(!node.parentID) return
            this.$router.push(this.localePath('explorer') + `?id=${this.id}&dir=${node.parentID}`)
        })
    },
    changeDirectory(dir) {
      this.$router.push(this.localePath('explorer') + `?id=${this.id}&dir=${dir.id}`)
    },
    createDirectory(directoryName) {
      this.$store.commit("fileSystem/createDirectory", {
        name: directoryName,
        instanceID: this.id,
        parentID: this.dirID
      })
      this.fetchNodes()
    },
    createFile(fileName) {
      this.$store.commit("fileSystem/createFile", {
        name: fileName,
        content: '',
        instanceID: this.id,
        parentID: this.dirID
      })
      this.fetchNodes()
    },
    openFile(item) {
      const arr = item.name.split('.')
      const ext = arr[arr.length - 1]
      if(ext === 'md') {
        this.$router.push(this.localePath('markdown_editor') + `?id=${this.id}&file=${item.id}`)
      } else if(ext === 'dgm') {
        this.$router.push(this.localePath('diagram') + `?id=${this.id}&file=${item.id}`)
      } else {
        this.$router.push(this.localePath('text_editor') + `?id=${this.id}&file=${item.id}`)
      }
    },
    removeFile() {
      this.$store.commit('fileSystem/removeFile', this.removeCandidate)
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
      this.removeFileDialog = false
    },
    removeDirectory() {
      this.$store.commit('fileSystem/removeDirectory', this.removeCandidate)
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
      this.removeDirectoryDialog = false
    }
  }
}
</script>
