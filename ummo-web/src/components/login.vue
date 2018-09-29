<style scoped>

#login-form {
    padding-top: 5%;
}

.input-group label {
    font-size: 25px;
}

.form {
    padding: 30px;
}
</style>

<template>

<v-layout row>
    <v-dialog value="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
        <v-card>
            <v-toolbar dark color="black">
                <v-toolbar-title>{{login_view?login_text:signup_text}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>

                </v-toolbar-items>
            </v-toolbar>
            <v-layout row wrap justify-center text-xs-center>
                <v-flex xs4 id="login-form">
                    <v-card v-if="login_view">
                        <v-form class="form">
                            <v-text-field class="login-input" label="Email" v-model="user.email" required></v-text-field>
                            <v-text-field class="login-input" type="password" label="Password" v-model="user.password" required></v-text-field>
                        </v-form>

                        <v-card-actions>
                            <v-btn flat color="orange" @click="login()">Login</v-btn>
                        </v-card-actions>
                        <div @click="togle_login">you dont have an account? signup</div>
                    </v-card>

                    <v-card v-if="!login_view">
                        <v-card-text>
                            <v-text-field class="login-input" label="Email" v-model="user.email"></v-text-field>
                            <v-text-field class="login-input" label="Name" v-model="user.name"></v-text-field>
                            <v-text-field class="login-input" label="Surname" v-model="user.surname"></v-text-field>
                            <v-text-field class="login-input" type="password" label="Password" v-model="user.password"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat color="orange" @click="signup">Signup</v-btn>
                        </v-card-actions>
                        <div @click="togle_login">You already have an account? login</div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>
</v-layout>

</template>

<script>

export default {
    name: "login",
    parse: true,
    params: ['login_dialog'],
    data() {
        return {
            login_view: true,
            dialog: true,
            notifications: false,
            sound: true,
            widgets: false,
            signup_text: 'Create An Account to continue',
            login_text: 'Login to your account',
            user: {}
        }
    },
    async created() {
        const query = new this.$parse.Query(this.$parse.User);
        const user_count= await query.count();
        console.log(user_count)
        if (user_count === 0) {
            this.togle_login()
        }
    },
    methods: {
        togle_login() {
                this.login_view = !this.login_view
            },
        async login() {
            try{
                await this.$parse.User.logIn(this.user.email,this.user.password)
                window.location = window.location
            } catch (e) {
                alert("Error: " + e.code + " " + e.message);
            }

        },
        async signup() {
            const user = new this.$parse.User();
            for(var i of Object.keys(this.user)){
                  user.set(i,this.user[i])
            }
            user.set('username',this.user.email)
            try{
                await user.signUp()
            }catch (e) {
                alert("Error: " + e.code + " " + e.message);
            }
        }
    }
}

</script>
