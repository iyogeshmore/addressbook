<template>
  <v-row class="mb-10" justify="center">
    <v-col cols="12" sm="10">
      <v-card class="mt-10" ref="form">
        <v-text-field outlined ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
          label="Name" placeholder="Enter Name" required>
        </v-text-field>
        <v-text-field outlined ref="email" v-model="email" :rules="[() => !!email || 'This field is required']"
          label="email" placeholder="Enter Email" required>
        </v-text-field>
        <v-text-field outlined ref="password" v-model="password" :rules="[() => !!password || 'This field is required']"
          label="password" placeholder="Enter password" required>
        </v-text-field>
        <center>
          <v-btn class="mb-10" elevation="6" outlined color="primary" text @click="submit">
            Sign Up
          </v-btn>&nbsp &nbsp
<router-link to="/"> <v-btn class="mb-10" elevation="6" outlined color="primary" text>
            Cancel
          </v-btn></router-link>
             
        </center>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AddressBookService from '@/Service/AddressBookService'
export default {
  name: 'SignUp',
  data: () => ({

    name: null,
    email: null,
    password: null,
  }),

  computed: {
    form() {
      return {
        name: this.name,
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
      AddressBookService.signUp(data)
        .then((response) => {
          console.log(response);
          console.log(response.data.data);
          this.employees = response.data.data;
          alert("Sign Up Successfully!!", response);
          this.$router.push({ name: "signIn" });
        })
        .catch((error) => {
          console.log(error);
          alert("WARNING!! Error while Sign up!");
        });
    },
  },
}
</script>