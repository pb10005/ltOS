<i18n>
{
    "ja": {
        "filename": "ファイル名",
        "save": "保存",
          "dir": "保存先"
    },
    "en": {
        "filename": "File Name",
        "save": "Save",
        "dir": "Directory"
    }
}
</i18n>
<template>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-icon color="success" dark v-on="on">mdi-content-save</v-icon>
      </template>
      <v-card class="pa-5">
          <v-card-title>
              {{$t('save')}}
          </v-card-title>
          <v-content>
              <v-text-field v-model="fileName" :label="$t('filename')"></v-text-field>
              <v-subheader>{{$t('dir')}}</v-subheader>
              <v-radio-group v-model="selected">
                  <v-radio
                    v-for="(item, index) in directories"
                    :key="index"
                    :label="item.name"
                    :value="item">
                  </v-radio>
              </v-radio-group>
              <v-btn @click="save" color="success">{{$t('save')}}</v-btn>
          </v-content>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    components: {
    },
    computed: {
        directories() {
            return this.$store.getters["fileSystem/allDirectories"]
        }
    },
    mounted() {
        this.selected = this.directories[0]
    },
    data() {
        return {
            dialog: false,
            fileName: '',
            selected: null
        }
    },
    methods: {
        save() {
            if(!this.fileName) return
            this.$emit("save", {
                fileName: this.fileName,
                dir: this.selected
            })
            this.$router.push(this.localePath('explorer'))
            
        }
    }
}
</script>
