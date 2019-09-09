<template>
  <b-card @click.prevent="clickItem($event,data)">
    <div>
      <b-row align-v="center">
        <b-col>
          <div class="d-flex flex-row" no-body>
            <div class="d-flex flex-grow-1 min-width-zero">
              <div
                class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <p class="mb-1 text-muted text-small">Payment ID</p>
                  <p class="list-item-heading mb-1 truncate">{{data.id}}</p>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Amount</p>
          <p class="mb-1">{{data.amount}}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Status</p>
          <b-badge pill :variant="data.status?'success':'danger'">{{ data.status?'PAID':'UNPAID' }}</b-badge>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Customer</p>
          <p class="mb-1">{{data.customer.firstName}} {{data.customer.lastName}}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">User</p>
          <p class="mb-1">{{data.user.fullName}}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Sale (Total)</p>
          <p class="mb-1">{{data.sale.total}}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Branch</p>
          <p class="mb-1">{{data.branch.name }}</p>
        </b-col>
        <b-col col lg="2">
          <p class="mb-1 text-muted text-small">Created date</p>
          <p class="mb-1">{{data.createdAt | humanDate}}</p>
        </b-col>
      </b-row>
      <!--<div @click.prevent="clickItem($event,data)" class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-start min-width-zero align-items-lg-center">-->
      <!--<div class="w-5">-->
      <!--<img width="40px" height="40px"  :src="data.image" alt="Card image cap" class="img-thumbnail list-thumbnail-letters small rounded-circle align-self-center m-4 small" />-->
      <!--</div>-->
      <!--<div class="w-40">-->
      <!--<p class="mb-1 text-muted text-small">Full Name</p>-->
      <!--<p class="list-item-heading mb-1 truncate">{{data.fullName}}</p>-->
      <!--</div>-->
      <!--<div class="w-30">-->
      <!--<p class="mb-1 text-muted text-small">Phone</p>-->
      <!--<p class="mb-1">{{data.phone }}</p>-->
      <!--</div>-->
      <!--<div class="w-10">-->
      <!--<p class="mb-1 text-muted text-small">Type</p>-->
      <!--<p class="mb-1">{{data.type }}</p>-->
      <!--</div>-->
      <!--<div class="w-10">-->
      <!--<p class="mb-1 text-muted text-small">Registration date</p>-->
      <!--<p class="mb-1">{{data.createdAt | humanDate}}</p>-->
      <!--</div>-->
      <!--</div>-->
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