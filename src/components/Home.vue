<template>
  <v-simple-table class="mt-10">
    <template v-slot:default>
      <thead>
        &nbsp &nbsp
        <router-link to="/addcontact">
          <v-btn elevation="6" outlined>Add Contact</v-btn>
        </router-link>&nbsp &nbsp
        <v-btn @click="sortAddressBookByCity(addressBook)" elevation="6" outlined>Sort by city</v-btn>
        &nbsp &nbsp
        <v-btn @click="sortAddressBookByState(addressBook)" elevation="6" outlined>Sort by State</v-btn> &nbsp &nbsp
        <router-link to="./">
          <v-btn elevation="6" outlined>Logout</v-btn>
        </router-link>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Address
          </th>
          <th class="text-left">
            Phone Number
          </th>
          <th class="text-left">
            City
          </th>
          <th class="text-left">
            state
          </th>
          <th class="text-left">
            Zip
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="addressBook in addressBookData" :key="addressBook.id">
          <td>{{ addressBook.fullName }}</td>
          <td>{{ addressBook.address }}</td>
          <td>{{ addressBook.phoneNo }}</td>
          <td>{{ addressBook.city }}</td>
          <td>{{ addressBook.state }}</td>
          <td>{{ addressBook.zipCode }}</td>
          <td>
            <img @click="remove(addressBook.id)" src="../assets/delete.svg" alt="delete" /> &nbsp
            <img @click="update(addressBook.id)" src="../assets/edit.svg" alt="edit" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</template>

<script>
import AddressBookService from "../Service/AddressBookService";

export default {
  name: 'Home',
  data() {
    return {
      addressBookData: [],
    };
  },
  methods: {
    sortAddressBookByCity() {
      AddressBookService.sortAddressBookByCity().then((response) => {
        console.log(response.data.data);
        this.addressBookData = response.data.data;
      });
    },
    sortAddressBookByState() {
      AddressBookService.sortAddressBookByState().then((response) => {
        console.log(response.data.data);
        this.addressBookData = response.data.data;
      });
    },

    getAllAddressBookData() {
      AddressBookService.getAllAddressBookData().then((response) => {
        console.log(response.data.data);
        this.addressBookData = response.data.data;
      });
    },

    update(id) {
      this.$router.push({ name: "EditForm", params: { id: id } });
    },

    remove(id) {
      var answer = window.confirm(
        "Press ok to delete data..."
      );
      if (answer === true) {
        AddressBookService.deleteAddressBook(id)
          .then((data) => {
            alert("Contact deleted Successfully!!");
            location.reload();
            this.getAllAddressBookData();
          })
          .catch((error) => {
            alert("Something Went Wrong!");
          });
      } else {
        alert("Contact Not Deleted!!!");
      }
    },

    displayMessage() {
      console.log("Welcome to Bridgelabz");
    },
  },
  created() {
    this.displayMessage();
    this.getAllAddressBookData();
  },
};
</script>