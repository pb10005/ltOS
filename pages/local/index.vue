<template>
    <section>
        <h3>Apps</h3>
        <v-divider />
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-application</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <nuxt-link to="/explorer">Explorer</nuxt-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-application</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <nuxt-link to="/explorer">Text Editor</nuxt-link>
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