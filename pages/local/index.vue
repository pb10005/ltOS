<i18n>
{
    "ja": {
        "apps": "アプリ一覧",
        "explorer": "エクスプローラ",
        "texteditor": "テキストエディタ"
    },
    "en": {
        "apps": "Apps",
        "explorer": "Explorer",
        "texteditor": "Text Editor"
    }
}
</i18n>
<template>
    <section>
        <h3>{{ $t('apps') }}</h3>
        <v-divider />
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-application</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <nuxt-link to="/explorer">{{ $t('explorer') }}</nuxt-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-application</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <nuxt-link to="/explorer">{{ $t('texteditor') }}</nuxt-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-application</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <nuxt-link to="/explorer">Markdown Viewer</nuxt-link>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </section>
</template>
<script>
export default {
    
}
</script>