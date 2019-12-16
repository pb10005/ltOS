<i18n>
{
    "ja": {
        "addins": "インスタンスを追加",
        "insname": "インスタンス名" ,
        "create": "作成",
        "public": "公開",
        "private": "非公開"
    },
    "en": {
        "addins": "Add instance",
        "insname": "Instance Name",
        "create": "Create",
        "public": "Public",
        "private": "Private"
    }
}
</i18n>
<template>
    <section>
        <v-card class="pa-1">
            <v-card-title class="headline">
                {{ $t('addins') }}
            </v-card-title>
            <v-card-content>
                <v-text-field :label="$t('insname')" v-model="name"></v-text-field>
                <v-switch v-model="private" :label="private ? $t('private') : $t('public')"></v-switch>
                <v-btn @click="createInstance">{{ $t('create') }}</v-btn>
            </v-card-content>
        </v-card>
    </section>
</template>
<script>
export default {
    data() {
        return {
            name : '',
            private: false
        }
    },
    methods: {
        createInstance() {
            if(!this.name) return
            this.$store.dispatch("cloud/createInstance", {
                name: this.name,
                private: this.private
            })
        }
    }
}
</script>
