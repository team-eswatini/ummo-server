<template>
    <div>
        <v-card>
            <newthing :form="service_form" @save="create_service">
                <file @uploaded="set_logo"/>

                <v-chip v-for="i in steps" color="primary" text-color="white" close @input="remove_step(i)">
                    {{i}}
                </v-chip>

                <newthing :form="steps_form" @save ="save_step" />
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
                steps:[],
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
                },
                steps_form: {
                    title: 'Steps to get Service',
                    data: {},
                    fields: [
                        {label: 'Next Step', v_model: 'step', type: 'text', id: 0}
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
                service.set('steps',this.steps)
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
            save_step(step){
                this.steps.push(step.step)
            },
            remove_step(i){
              this.steps.splice(this.steps.indexOf(i),1)
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
