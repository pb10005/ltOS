<i18n>
{
    "ja": {
        "apps": "アプリ一覧",
        "explorer": "エクスプローラ",
        "texteditor": "テキストエディタ",
        "markdown": "マークダウン",
        "diagram": "グラフ描画",
        "setting": "設定"
    },
    "en": {
        "apps": "Apps",
        "explorer": "Explorer",
        "texteditor": "Text Editor",
        "markdown": "Markdown Editor",
        "diagram": "Diagram Editor",
        "setting": "Settings"
    }
}
</i18n>
<template>
    <section>
        <v-card outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{ instanceName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ owner.name }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-list>
            <v-list-item @click="$router.push(localePath(item.link) + `?id=${id}`)" v-for="(item, index) in items" :key="index">
                <v-list-item-avatar>
                    <v-icon color="indigo">{{item.icon}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    {{ $t(item.name) }}
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </section>
</template>
<script>
export default {
    middleware: ['auth'],
    mounted() {
        this.$store.commit("app/app", "apps")
        this.$store.dispatch("fileSystem/getFS", { id: this.id })
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        owner() {
            return this.$store.getters['fileSystem/owner']
        },
        instanceName() {
            return this.$store.getters['fileSystem/instanceName']
        }
    },
    data() {
        return {
            items: [
                {
                    name: 'explorer',
                    icon: 'mdi-folder-multiple',
                    link: 'explorer'
                },
                {
                    name: 'texteditor',
                    icon: 'mdi-file-document-edit',
                    link: 'text_editor'
                },
                {
                    name: 'markdown',
                    icon: 'mdi-markdown',
                    link: 'markdown_editor'
                },
                {
                    name: 'diagram',
                    icon: 'mdi-graph',
                    link: 'diagram'
                }
            ]
        }
    }
}
</script>
