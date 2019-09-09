<template>
  <b-card :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        @click.prevent="clickItem($event,data)"
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
      >
        <div class="w-200">
          <p class="mb-1 text-muted text-small">No.</p>
          <p class="mb-1">{{data.id }}</p>
        </div>

        <div>
          <p class="mb-1 text-muted text-small">User</p>
          <p class="list-item-heading mb-1 truncate">{{data.user.fullName}}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Phone</p>
          <p class="mb-1">{{data.user.phone }}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">To Role</p>
          <p class="mb-1">{{data.toRole}}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Status</p>
          <b-badge
            pill
            :variant="data.status === 'ACCEPTED'?'success':data.status === 'PENDING' || data.status === 'PROCESSED'? 'secondary': 'danger'"
          >{{ data.status }}</b-badge>
        </div>
        
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Escalation Level</p>
          <p class="mb-1">{{data.orderEscalationLevel}}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Total(in Tsh)</p>
          <p class="mb-1">{{data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
        </div>
        <div class="w-200">
          <p class="mb-1 text-muted text-small">Registration date</p>
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