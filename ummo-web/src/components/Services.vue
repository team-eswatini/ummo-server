<template>
    <div>
        <v-card>
            <newthing :form="service_form" @save="create_service">
                <file @uploaded="set_logo"/>
            </newthing>
            <v-list two-line>
                <template v-for="(item, index) in services">
                    <v-list-tile
                            :key="item.name"
                            avatar
                            @click=""
                    >
                        <v-list-tile-avatar>
                            <img :src="item.logo_url">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title >Title:{{item.name}}</v-list-tile-title>
                            <v-list-tile-sub-title v-html="details(item)"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>

    </div>
</template>

<script>
    import newthing from './newthing'
    import file from './file'
    export default {
        name: "Services",
        components: {newthing,file},
        data() {
            return {
                service_logo: '',
                services:[],
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
        created(){
          this.reload_services()
        },
        methods: {
            create_service(data)
            {
                const Service = this.$parse.Object.extend("Service");
                const service = new Service()
                for(var d in data){
                   service.set(d,data[d])
                }
                service.set("logo_url",this.service_logo)
                service.set("owner",this.$parse.User.current())
                try {
                    service.save()
                    this.reload_services()
                }catch (e) {
                    alert(e)
                }
            },
            details(item){
              return  `<span class='text--primary'>Created on ${item.createdAt}</span>`
            },
            set_logo(url){
                this.service_logo = url
            },
            async reload_services(){
                const Services = this.$parse.Object.extend("Service");
                const query = new this.$parse.Query(Services);
                query.equalTo("owner", this.$parse.User.current());
                try{
                    const results = await query.find();
                    this.services = [];
                    for(var i =0; i<results.length; i++){
                        this.services.push(results[i].attributes)
                    }
                    console.log(results)
                }catch (e) {
                    console.log(e)
                }

            }

        }
    };
</script>

<style scoped>
</style>
