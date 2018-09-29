<template>
    <div>
        <v-card>
            <newthing :form="service_form" @save="create_service">

                Logo

                <v-text-field
                        placeholder="logo"
                        v-model="service_logo"
                        type="file"
                ></v-text-field>
            </newthing>
            <v-list two-line>
                <template v-for="(item, index) in items">
                    <v-subheader
                            v-if="item.header"
                            :key="item.header"
                    >
                        {{ item.header }}
                    </v-subheader>

                    <v-divider
                            v-else-if="item.divider"
                            :inset="item.inset"
                            :key="index"
                    ></v-divider>

                    <v-list-tile
                            v-else
                            :key="item.title"
                            avatar
                            @click=""
                    >
                        <v-list-tile-avatar>
                            <img :src="item.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>

    </div>
</template>

<script>
    import newthing from './newthing'

    export default {
        name: "Services",
        components: {newthing},
        data() {
            return {
                service_logo: '',
                items: [
                    {header: 'Today'},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                    }
                ],
                service_form: {
                    title: 'Item Details',
                    data: {},
                    fields: [
                        {label: 'Service Name', v_model: 'name', type: 'text', id: 0},
                        {label: 'Department', v_model: 'department', type: 'text', id: 1},
                        {label: 'Requirements', v_model: 'requirements', type: 'text', id: 2},
                        {label: 'Province', v_model: 'province', type: 'string', id: 3},
                        {label: 'District', v_model: 'district', type: 'text', id: 4},
                        {label: 'Municipality', v_model: 'municipality', type: 'text', id: 5},
                    ]
                }

            };
        },
        methods: {
            create_service()
            {

            }
        }
    };
</script>

<style scoped>
</style>
