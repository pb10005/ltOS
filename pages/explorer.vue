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
    <node-list
      :nodes="nodes"
      @changeDirectory="changeDirectory"
      @removeDirectory="removeDirectory"
      @openFile="openFile"
      @removeFile="removeFile"/>
    <v-btn color="indigo" dark @click="$router.push(localePath('apps') + `?id=${id}`)">{{ $t('apps') }}</v-btn>
  </section>
</template>
<script>
import CreateDirectoryDialog from '@/components/CreateDirectoryDialog'
import CreateFileDialog from '@/components/CreateFileDialog'
import NodeList from '@/components/NodeList'
export default {
  components: {
    CreateDirectoryDialog,
    CreateFileDialog,
    NodeList
  },
  mounted() {
    this.$store.commit("app/app", "explorer")
  },
  computed: {
    path() {
      return this.$store.getters["fileSystem/currentDirectoryPath"]
    },
    nodes() {
      return this.$store.getters["fileSystem/currentDirectory"]
    },
    id() {
      return this.$route.query.id || ''
    }
  },
  methods: {
    up() {
      this.$store.commit("fileSystem/up")
    },
    changeDirectory(name) {
      this.$store.commit("fileSystem/changeDirectory", name)
    },
    createDirectory(directoryName) {
      this.$store.commit("fileSystem/createDirectory", {
        name: directoryName
      })
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
    },
    createFile(fileName) {
      this.$store.commit("fileSystem/createFile", {
        name: fileName,
        content: ''
      })
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
    },
    openFile(item) {
      this.$store.commit('fileSystem/setCurrentFile', item)
      const arr = item.name.split('.')
      const ext = arr[arr.length - 1]
      if(ext === 'md') {
        this.$router.push(this.localePath('markdown_editor') + `?id=${this.id}`)
      } else if(ext === 'dgm') {
        this.$router.push(this.localePath('diagram') + `?id=${this.id}`)
      } else {
        this.$router.push(this.localePath('text_editor') + `?id=${this.id}`)
      }
    },
    removeFile(item) {
      this.$store.commit('fileSystem/removeFile', item)
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
    },
    removeDirectory(item) {
      this.$store.commit('fileSystem/removeDirectory', item)
      this.$store.commit("fileSystem/save", this.$route.query.id || '')
    }
  }
}
</script>
