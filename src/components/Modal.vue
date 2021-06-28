<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Edit the selected record
        </slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </header>
      <section class="modal-body">
        <form id="modalInput">
          <input
            v-model="eCustomer.first_name"
            :placeholder="eCustomer.first_name"
          />
          <input
            v-model="eCustomer.last_name"
            :placeholder="eCustomer.last_name"
          />
          <input v-model="eCustomer.email" :placeholder="eCustomer.email" />
          <input v-model="eCustomer.phone" :placeholder="eCustomer.phone" />
          <input v-model="eCustomer.address" :placeholder="eCustomer.address" />
          <input
            v-model="eCustomer.description"
            :placeholder="eCustomer.description"
          />
        </form>
      </section>
      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="editCustomerModal">
          Save
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
export default {
  name: "Modal",
  modalCustomer: {},
  props: {
    eCustomer: {
      type: Object
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    editCustomerModal() {
      let modalData = {
        _id: this.eCustomer._id,
        first_name: this.eCustomer.first_name,
        last_name: this.eCustomer.last_name,
        email: this.eCustomer.email,
        phone: this.eCustomer.phone,
        address: this.eCustomer.address,
        description: this.eCustomer.description
      };
      console.log(modalData);
      axios.put(
        `${server.baseURL}/customer/update?customerID=${this.eCustomer._id}`,
        modalData
      );
      this.$emit("close");
    }
  }
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(150, 150, 150, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  background: rgba(180, 180, 180, 0.5);
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
