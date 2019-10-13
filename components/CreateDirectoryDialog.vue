<i18n>
{
  "ja": {
    "dirname": "ディレクトリ名",
      "close": "閉じる",
      "save": "保存"
  },
  "en": {
    "dirname": "Directory Name",
      "close": "Close",
    "save": "Save"
  }
}
</i18n>
<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon color="primary" dark v-on="on">mdi-folder-plus</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t('dirname')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-text-field v-model="name" :label="$t('dirname')" required></v-text-field>
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
            dialog: false,
            name: ''
        }
    },
    methods: {
        ok() {
            this.$emit("ok", this.name)
            this.name = ''
            this.dialog = false
        },
        cancel() {
            this.dialog = false
        }
    }
}
</script>
