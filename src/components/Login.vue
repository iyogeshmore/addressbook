<template>
    <v-row class="mb-10" justify="center">
        <v-col cols="12" sm="10">
            <v-card class="mt-10" ref="form">
                <v-text-field outlined ref="email" v-model="email" :rules="[() => !!email || 'This field is required']"
                    label="email" placeholder="Enter Email" required>
                </v-text-field>
                <v-text-field outlined ref="password" v-model="password"
                    :rules="[() => !!password || 'This field is required']" label="password"
                    placeholder="Enter password" required>
                </v-text-field>
                <center>
                       <router-link to="./about">
                        <v-btn class="mb-10" elevation="6" outlined color="primary" text>About</v-btn>
                    </router-link> &nbsp&nbsp&nbsp&nbsp
                    <v-hover> <v-btn class="mb-10" color="red lighten-2" dark elevation="6" outlined  text @click="submit">Sign In</v-btn></v-hover>&nbsp&nbsp&nbsp&nbsp
                    <router-link to="./signUp">
                        <v-btn class="mb-10" elevation="6" outlined color="primary" text>Sign Up</v-btn>
                    </router-link>
                </center>

            </v-card>
        </v-col>
    </v-row>

</template>

<script>
import AddressBookService from '@/Service/AddressBookService'
export default {
    name: 'SignIn',
    data: () => ({
        email: null,
        password: null,
    }),

    computed: {
        form() {
            return {
                email: this.email,
                password: this.password,
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        submit() {
            const data = this.form;
            AddressBookService.signIn(data)
                .then((response) => {
                    console.log(response);
                    console.log(response.data.data);
                    this.employees = response.data.data;
                    alert("Sign In Successfully!!", response);
                    this.$router.push({ name: "Home" });
                })
                .catch((error) => {
                    console.log(error);
                    alert("WARNING!! Error while Sign In!");
                });
        },
    },
}
</script>