<template>
  <b-card @click.prevent="clickItem($event,data)">
    <div>
      <b-row align-v="center">
        <b-col>
          <p class="mb-1 text-muted text-small">Branch ID</p>
          <p class="mb-1">{{data.id }}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Branch Name</p>
          <p class="mb-1">{{data.name }}</p>
        </b-col>
        <b-col>
          <p class="mb-1 text-muted text-small">Address</p>
          <p class="mb-1">{{data.address }}</p>
        </b-col>
        <b-col col lg="2">
          <p class="mb-1 text-muted text-small">Registration Date</p>
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
