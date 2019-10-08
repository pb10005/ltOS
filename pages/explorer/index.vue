<template>
  <section>
    <form>
      <input />
    </form>
    <button @click="up" class="button--green">..</button>
    <button @click="createDirectory" class="button--green">Create New Directory</button>
    <button @click="createFile" class="button--green">Create New File</button>
    <div v-for="(item, index) in nodes" :key="index">
      <button
        @click="changeDirectory(item.name)"
        v-if="item.nodeType==='directory'"
        class="button--gray">{{item.name}}/</button>
      <span v-else>{{item.name}}</span>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {
  },
  computed: {
    nodes() {
      return this.$store.getters["fileSystem/currentDirectory"];
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
        name: "aaa"
      })
    },
    createFile() {
      this.$store.commit("fileSystem/createFile", {
        name: "bbb",
        content: "yeahhhhhh"
      })      
    }
  }
}
</script>
