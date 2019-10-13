<i18n>
{
    "ja": {
      "apps": "アプリ一覧",
      "explorer": "エクスプローラ",
      "save": "保存",
        "path": "パス"
    },
    "en": {
      "apps": "Apps",
      "explorer": "Explorer",
      "save": "Save",
        "path": "Path"
    }
}
</i18n>
<template>
  <section>
    <v-text-field :label="$t('path')" v-model="path"></v-text-field>
    <v-icon @click="up">mdi-arrow-collapse-up</v-icon>
    <create-directory-dialog @ok="createDirectory" />
    <create-file-dialog @ok="createFile" />
    <node-list
      :nodes="nodes"
      @changeDirectory="changeDirectory"
      @removeDirectory="removeDirectory"
      @openFile="openFile"
      @removeFile="removeFile"/>
    <v-btn @click="$router.push(localePath('local'))">{{ $t('apps') }}</v-btn>
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
      this.$store.commit("fileSystem/save")
    },
    createFile(fileName) {
      this.$store.commit("fileSystem/createFile", {
        name: fileName,
        content: ''
      })
      this.$store.commit("fileSystem/save")
    },
    openFile(item) {
      this.$store.commit('fileSystem/setCurrentFile', item)
      this.$router.push(this.localePath('text_editor'))
    },
    removeFile(item) {
      this.$store.commit('fileSystem/removeFile', item)
      this.$store.commit("fileSystem/save")
    },
    removeDirectory(item) {
      this.$store.commit('fileSystem/removeDirectory', item)
      this.$store.commit("fileSystem/save")
    }
  }
}
</script>
