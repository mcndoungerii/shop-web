<template>
  <b-card @click.prevent="clickItem($event,data)">
    <div>
      <b-row align-v="center">
        <b-col v-if="data.receiptnumber">
          <div class="d-flex flex-row" no-body>
            <div class="d-flex flex-grow-1 min-width-zero">
              <div
                class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <p class="mb-1 text-muted text-small">{{$t("report.receipt-number")}}</p>
                  <p class="list-item-heading mb-1 truncate">{{data.receiptnumber}}</p>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col v-if="data.productname">
          <p class="mb-1 text-muted text-small">{{$t("report.product-name")}}</p>
          <p class="mb-1">{{data.productname }}</p>
        </b-col>
        <b-col v-if="data.shopname">
          <p class="mb-1 text-muted text-small">{{$t("report.shop-name")}}</p>
          <p class="mb-1">{{data.shopname }}</p>
        </b-col>
        <b-col v-if="data.seller">
          <p class="mb-1 text-muted text-small">{{$t("report.seller")}}</p>
          <p class="mb-1">{{data.seller}}</p>
        </b-col>

        <!-- <b-col>
          <p class="mb-1 text-muted text-small">Mode of Payment</p>
          <p class="mb-1">{{data.sale.modeOfPayment }}</p>
        </b-col>-->

        <b-col v-if="data.total">
          <p class="mb-1 text-muted text-small">{{$t("report.total")}}</p>
          <p class="mb-1">Tsh {{data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} /=</p>
        </b-col>

        <b-col v-if="data.date" col lg="2">
          <p class="mb-1 text-muted text-small">{{$t("report.sale-date")}}</p>
          <p class="mb-1">{{data.date}}</p>
        </b-col>
      </b-row>
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