<template>
  <v-row class="mb-10" justify="center">
    <v-col cols="12" sm="10">
      <v-card class="mt-10" ref="form">
        <v-card-text>
          <v-text-field 
          outlined ref="fullName" 
          v-model="fullName" 
          :rules="[() => !!fullName || 'This field is required']"
            :error-messages="errorMessages" 
            label="Full Name" 
            placeholder="John Doe" required>
            </v-text-field>
          <v-text-field 
          outlined ref="phoneNo" 
          v-model="phoneNo"
            :rules="[() => !!phoneNo || 'This field is required']" 
            :error-messages="errorMessages"
            label="Phone Number" 
            placeholder="e.g. 91 1234567890" required>
            </v-text-field>
          <v-textarea
          outlined ref="address" 
          v-model="address" 
          :rules="[
            () => !!address || 'This field is required',
            () => !!address && address.length <= 45 || 'Address must be less than 45 characters',
            addressCheck
          ]" 
          label="Address Line" 
          placeholder="Enter Address Here" counter="45" required>
          </v-textarea>
          <v-row>
            <v-autocomplete class="ml-3 mr-1 " 
            outlined ref="city" 
            v-model="city"
              :rules="[() => !!city || 'This field is required']" 
              :items="cities" label="City" placeholder="Select..."
              required>
              </v-autocomplete>
            <v-autocomplete class="ml-2" 
            outlined ref="state" 
            v-model="state"
              :rules="[() => !!state || 'This field is required']" 
              :items="States" 
              label="State" 
              placeholder="Select..."
              required>
              </v-autocomplete>
            <v-text-field class="ml-2  mr-3" 
            outlined ref="zipCode" 
            v-model="zipCode"
              :rules="[() => !!zipCode || 'This field is required']" 
              label="ZIP / Postal Code" required 
              placeholder="79938">
            </v-text-field>
          </v-row>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon class="my-0" v-bind="attrs" @click="resetForm" v-on="on">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AddressBookService from '@/Service/AddressBookService'
export default {
  name: 'EditForm',
  data: () => ({
    States: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],

    cities: ['Amaravati', 'Tirupati', 'Itanagar', 'Dispur', 'Guwahati', 'Patna', 'Chandigarh', 'Raipur', 'Silvassa', 'New Delhi', 'Panaji', 'Ahmadabad', 'Surat', 'Faridabad', 'Shimla', 'Jammu', 'Ranchi', 'Kochi', 'Indore', 'Ujjain', 'Kalyan', 'Kolhapur', 'Mumbai', 'Nagpur', 'Pune', 'Satara', 'Amritsar', 'Jalandhar', 'Jaipur', 'Kota', 'Hyderabad', 'Agra', 'Ghaziabad', 'Kolkata', 'Varanasi'],

    errorMessages: '',
    fullName: null,
    address: null,
    city: null,
    state: null,
    zipCode: null,
    phoneNo: null,
    formHasErrors: false,
  }),

  computed: {
    form() {
      return {
        fullName: this.fullName,
        address: this.address,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        phoneNo: this.phoneNo,
      }
    },
  },

  watch: {
    fullName() {
      this.errorMessages = ''
    },
  },

  methods: {
    addressCheck() {
      this.errorMessages = this.address && !this.fullName
        ? `Hey! I'm required`
        : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      
        const data = this.form;
            AddressBookService.updateAddressBook(this.id, this.form)
                .then((response) => {
                    console.log(response.data.data);
                    this.employees = response.data.data;
                    alert("Contact Update Successfully!!", response);
                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    console.log(error);
                    alert("WARNING!! Error while edting the data!");
                });
        },
    getAddressBookById(id) {
            AddressBookService.getAddressBookById(id)
                .then((response) => {
                    let object = response.data.data;
                    this.setData(object);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        setData(obj) {
            console.log(obj);
            this.id = obj.id;
            this.fullName = obj.fullName;
            this.address = obj.address;
            this.city = obj.city;
            this.state = obj.state;
            this.zipCode = obj.zipCode;
            this.phoneNo = obj.phoneNo;
            console.log(this.form);
        },
    },
    created() {
        this.getAddressBookById(this.$route.params.id);
  },
}
</script>