<i18n>
{
    "ja": {
        "insname": "インスタンス名" ,
        "create": "作成"
    },
    "en": {
        "insname": "Instance Name",
        "create": "Create"
    }
}
</i18n>
<template>
    <section>
        <v-text-field :label="$t('insname')" v-model="name"></v-text-field>
        <v-btn @click="createInstance">{{ $t('create') }}</v-btn>
    </section>
</template>
<script>
export default {
    data() {
        return {
            name : ''
        }
    },
    methods: {
        createInstance() {
            this.$store.dispatch("cloud/createInstance", {
                name: this.name
            })
        }
    }
}
</script>
