<template>
  <b-card :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        @click.prevent="clickItem($event,data)"
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
      >
        <div>
          <p class="mb-1 text-muted text-small">Product Name</p>
          <p class="list-item-heading mb-1 truncate">{{data.name}}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Description</p>
          <p class="mb-1">{{data.description }}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Quantity</p>
          <b-badge pill :variant="data.quantity < 1 ?'danger':'success'">{{ data.quantity}}</b-badge>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Serial Number</p>
          <p class="mb-1">{{data.serial }}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Product Price</p>
          <p class="mb-1">{{data.price }}</p>
        </div>
        <!-- <div  class="w-400">
                    <p class="mb-1 text-muted text-small">Packages</p>
                    <b-badge  class="mb-1" pill variant="secondary">{{data.quantity}} {{data.unit}} for Tsh {{data.sellPrice}}</b-badge>
        </div>-->
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Category</p>
          <p class="mb-1">{{data.category.name }}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Created at</p>
          <p class="mb-1">{{data.createdAt | humanDate}}</p>
        </div>
      </div>
    </div>
  </b-card>
</template>
<script>
let moment = require("moment");
export default {
  props: ["data", "selectedItems"],
  methods: {
    toggleItem(event, itemId) {
      this.$emit("toggle-item", event, itemId);
    },
    clickItem(event, itemId) {
      console.log(itemId);
      this.$emit("click-item", event, itemId);
    }
  },
  filters: {
    humanDate(val) {
      let date = moment(val).format("MM-DD-YYYY hh:mm a");
      return date;
    }
  }
};
</script>