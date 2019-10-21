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
          @click="onClick(item)">
          <v-list-item-avatar>
            <v-icon :color="getIcon(item.nodeType, item.name).color">{{getIcon(item.nodeType, item.name).type}}</v-icon>
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
        onClick(item) {
          if(['directory', 'trash'].includes(item.nodeType)) {
            this.changeDirectory(item)
          } else if(item.nodeType === 'file') {
            this.openFile(item)
          }
        },
        changeDirectory(dir) {
            this.$emit("changeDirectory",dir)
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
        getIcon(type, name) {
            if(type === 'directory') {
                return {
                  type: 'mdi-folder',
                  color: 'indigo light-1'
                }
            } else if(type === 'file') {
              const arr = name.split('.')
              const ext = arr[arr.length - 1]
              if(ext === 'md') {
                return {
                  type:'mdi-markdown',
                  color: 'lime accent-4'
                }
              } else if(ext === 'dgm') {
                return {
                  type: 'mdi-graph',
                  color: 'lime accent-4'
                }
              } else {
                return {
                  type: 'mdi-file-document',
                  color: 'lime accent-4'
                }
              }
            } else if(type === 'trash') {
                return {
                  type: 'mdi-trash-can',
                  color: 'indigo light-1'
                }
            }
        }
    }
}
</script>
