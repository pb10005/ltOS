<template>
  <section>
    <p>{{path}}</p>
    <v-btn @click="up">..</v-btn>

    <!-- Create new directory -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on"><v-icon>mdi-folder-plus</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Directory Name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-text-field v-model="directoryName" label="Name" required></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createDirectory">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Create new file -->
    <v-dialog v-model="fileDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on"><v-icon>mdi-file-plus</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">File Name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-text-field v-model="fileName" label="Name" required></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="fileDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createFile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list>
      <div
        v-for="(item, index) in nodes"
        :key="index">
        <v-list-item
          v-if="item.nodeType === 'directory'"
          @click="changeDirectory(item.name)">
          <v-list-item-avatar>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-avatar>
          <span>{{item.name}}</span>
        </v-list-item>
        <v-list-item
          v-else
          @click="openFile(item)">
          <v-list-item-avatar>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-avatar>
          <span>{{item.name}}</span>
        </v-list-item>
      </div>
    </v-list>
  </section>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      fileDialog: false,
      directoryName: '',
      fileName: ''
    }
  },
  mounted() {
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
    createDirectory() {
      this.$store.commit("fileSystem/createDirectory", {
        name: this.directoryName
      })
      this.directoryName = ''
      this.dialog = false
    },
    createFile() {
      this.$store.commit("fileSystem/createFile", {
        name: this.fileName,
        content: ''
      })
      this.fileName = ''
      this.fileDialog = false
    },
    openFile(item) {
      this.$store.commit('fileSystem/setCurrentFile', item)
      this.$router.push('/text_editor')
    }
  }
}
</script>
