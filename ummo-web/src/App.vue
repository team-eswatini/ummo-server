<template>
  <v-app id="App">
<Login v-if="!is_logged_in"/>
    <v-navigation-drawer
            v-else
            v-model="drawer"
            fixed
            clipped
            class="grey lighten-4"
            app
    >
      <v-list
              dense
              class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-list-tile
                  :key="i"
                  @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="black" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5 white--text">Ummo&nbsp;<span class="font-weight-light">{{title}}</span></span>
      <v-text-field
              solo-inverted
              flat
              hide-details
              label="Search"
              prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
              relative
              dark
              top
              left
              id="btn"
              color="pink"
              @click="logout"
      >
        logout
      </v-btn>
    </v-toolbar>
    <v-content>
          <Services/>
    </v-content>
  </v-app>
</template>

<script>
    import Services from "./components/Services";
    import Login from './components/login'
    export default {
        components: {Services,Login},
        data: () => ({
            title:'Create',
            components:{Services},
            drawer: null,
            items: [
                { icon: 'horizontal_split', text: 'Services',  },
                { icon: 'touch_app', text: 'Reminders' }
            ]
        }),
        props: {
            source: String
        },
        computed:{
          is_logged_in(){
              return !!this.$parse.User.current();
          }
        },
        methods:{
            logout(){
                this.$parse.User.logOut()
                window.location = window.location
            }
        }
    }
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
  #btn
    border-radius: 20px

</style>