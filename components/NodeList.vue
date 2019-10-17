<i18n>
{
  "ja": {
    "trash": "ごみ箱"
  },
  "en": {
    "trash": "Trash Bin"
  }
}
</i18n>
<template>
    <v-list>
      <div
        v-for="(item, index) in nodes"
        :key="item.name">
        <v-list-item
          v-if="item.nodeType === 'directory'"
          @click="changeDirectory(item)">
          <v-list-item-avatar>
            <v-icon color="indigo lighten-1">{{getIcon(item.nodeType)}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <span>{{item.name}}</span>
          </v-list-item-content>
          <v-list-item-action v-if="!item.default">
            <v-btn icon @click="removeDirectory(item)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-if="item.nodeType === 'file'"
          @click="openFile(item)">
          <v-list-item-avatar>
            <v-icon color="lime accent-4">{{getIcon(item.nodeType)}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <span>{{item.name}}</span>
          </v-list-item-content>
          <v-list-item-action v-if="!item.default">
            <v-btn icon @click="removeFile(item)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
            v-if="item.nodeType === 'trash'"
            @click="changeDirectory(item)">
          <v-list-item-avatar>
            <v-icon>{{getIcon(item.nodeType)}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <span>{{$t("trash")}}</span>
          </v-list-item-content>
          <v-list-item-action v-if="!item.default">
            <v-btn icon @click="removeDirectory(item)">
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index < nodes.length - 1" />
      </div>
    </v-list>
</template>
<script>
export default {
    props: {
        nodes: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods: {
        changeDirectory(name) {
            this.$emit("changeDirectory", name)
        },
        openFile(file) {
            this.$emit("openFile", file)
        },
        removeFile(file) {
            this.$emit("removeFile", file)
        },
        removeDirectory(directory) {
            this.$emit("removeDirectory", directory)
        },
        getIcon(type) {
            if(type === 'directory') {
                return 'mdi-folder'
            } else if(type === 'file') {
                return 'mdi-file-document'
            } else if(type === 'trash') {
                return 'mdi-trash-can'
            }
        }
    }
}
</script>
