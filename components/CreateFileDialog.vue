<i18n>
{
  "ja": {
    "filename": "ファイル名",
      "save": "保存",
      "close": "閉じる"
  },
    "en": {
      "filename": "File Name",
      "save": "Save",
      "close": "Close"
    }
}
</i18n>
<template>
    <v-dialog v-model="fileDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon color="primary" dark v-on="on">mdi-file-plus</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('filename')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-text-field v-model="fileName" :label="$t('filename')" required></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="cancel">{{$t('close')}}</v-btn>
          <v-btn color="blue darken-1" text @click="ok">{{$t('save')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            fileDialog: false,
            fileName: ''
        }
    },
    methods: {
        ok() {
            this.$emit("ok", this.fileName)
            this.fileName = ''
            this.fileDialog = false
        },
        cancel() {
            this.fileDialog = false
        }
    }
}
</script>
