// ./src/views/Home.vue
<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Nest Customer List App</h1>
      <p>Built with Nest.js, Vue.js and MongoDB by Caleb</p>
      <div v-if="customers.length === 0">
        <h2>No customer found at the moment</h2>
      </div>
    </div>
    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer._id">
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.description }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'Edit', params: { id: customer._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Customer
                  </router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="showModal(customer)"
                  >
                    Edit record (modal)
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteCustomer(customer._id)"
                  >
                    Delete Customer
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      :eCustomer="modalCustomer"
    />
  </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
import Modal from "../components/Modal.vue";

export default {
  data() {
    return {
      customers: [],
      Modal,
      modalCustomer: {},
      isModalVisible: false
    };
  },
  components: {
    Modal
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    showModal(customer) {
      this.modalCustomer = customer;
      this.isModalVisible = true;
      console.log(this.modalCustomer);
    },
    closeModal() {
      this.isModalVisible = false;
    },
    fetchCustomers() {
      axios
        .get(`${server.baseURL}/customer/customers`)
        .then(data => (this.customers = data.data));
    },
    deleteCustomer(id) {
      axios
        .delete(`${server.baseURL}/customer/delete?customerID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>
