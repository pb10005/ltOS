<i18n>
{
    "ja": {
        "remove": "削除",
        "confirm": "本当に削除しますか？"
    },
    "en": {
        "remove": "Remove Node",
        "confirm": "Are you sure you want to remove the node?"
    }
}
</i18n>
<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>
            {{$t('remove')}}
            </v-card-title>
            <v-content>
            {{$t('confirm')}}
            </v-content>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="ok">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
            dialog: {
                type: Boolean,
                default: false
            }
    },
    methods: {
        ok() {
            this.$emit("ok")
        },
        cancel() {
            this.$emit("cancel")
        }
    }
}
</script>