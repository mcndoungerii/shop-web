<template>
  <b-card :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        @click.prevent="clickItem($event,data)"
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
      >
        <div>
          <p class="mb-1 text-muted text-small">{{ $t("product.id") }}</p>
          <p class="list-item-heading mb-1 truncate">{{data.id}}</p>
        </div>
        <div>
          <p class="mb-1 text-muted text-small">{{ $t("product.name") }}</p>
          <p class="list-item-heading mb-1 truncate">{{data.product.name}}</p>
        </div>
        <div>
          <p class="mb-1 text-muted text-small">{{ $t("product.quantity") }}</p>
          <p class="list-item-heading mb-1 truncate">{{data.quantity}}</p>
        </div>
        <div>
          <p class="mb-1 text-muted text-small">{{ $t("product.shop-name") }}</p>
          <p class="list-item-heading mb-1 truncate">{{data.shop.name}}</p>
        </div>

        <div class="w-200">
          <p class="mb-1 text-muted text-small">{{ $t("product.createdAt") }}</p>
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