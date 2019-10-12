<template>
  <section>
    <h3>Explorer</h3>
    <v-icon @click="up">mdi-arrow-collapse-up</v-icon>
    <create-directory-dialog @ok="createDirectory" />
    <create-file-dialog @ok="createFile" />
    <v-btn class="success" @click="$store.commit('fileSystem/save')">Save</v-btn>
    <v-text-field label="path" v-model="path"></v-text-field>
    <node-list
      :nodes="nodes"
      @changeDirectory="changeDirectory"
      @removeDirectory="removeDirectory"
      @openFile="openFile"
      @removeFile="removeFile"/>
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
    },
    createFile(fileName) {
      this.$store.commit("fileSystem/createFile", {
        name: fileName,
        content: ''
      })
    },
    openFile(item) {
      this.$store.commit('fileSystem/setCurrentFile', item)
      this.$router.push('/text_editor')
    },
    removeFile(item) {
      this.$store.commit('fileSystem/removeFile', item)
    },
    removeDirectory(item) {
      this.$store.commit('fileSystem/removeDirectory', item)
    }
  }
}
</script>
