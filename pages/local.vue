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
        <v-list>
            <v-list-item @click="$router.push(localePath('item.link'))" v-for="(item, index) in items" :key="index">
                <v-list-item-avatar>
                    <v-icon>{{item.icon}}</v-icon>
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
    mounted() {
        this.$store.commit("app/app", "apps")
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
                    link: 'explorer'
                },
                {
                    name: 'diagram',
                    icon: 'mdi-graph',
                    link: 'diagram'
                },
                {
                    name: 'setting',
                    icon: 'mdi-settings',
                    link: 'setting'
                },
            ]
        }
    }
}
</script>
