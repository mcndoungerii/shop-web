<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="6" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="form-center">
          <router-link tag="a" to="/">
            <span class="logo-single" />
          </router-link>
          <h6 class="mb-4">{{$t('shops.shop-login')}}</h6>
          <b-card
            v-for="(shop,index) in user.shops"
            :key="index"
            class="mb-4 d-flex flex-row"
            no-body
          >
            <div class="d-flex flex-grow-1 min-width-zero">
              <div
                class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <h6 class="mb-1 card-subtitle truncate">{{shop.name}}</h6>
                  <p class="text-muted text-small mb-2">{{shop.address}}</p>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <b-button
                    size="xs"
                    @click="selectShop(shop)"
                    variant="outline-success"
                  >{{$t('user.login-button')}}</b-button>
                </div>
              </div>
            </div>
          </b-card>
          <b-button
            style="width: 100%;"
            @click="$modal.show('addShopModal')"
            variant="primary"
            size="lg"
            class="top-right-button"
          >{{$t('shops.add-shop')}}</b-button>
        </div>
      </b-card>
    </b-colxx>
    <!-- Add Shop Modal -->
    <modal height="auto" :scrollable="true" :adaptive="true" name="addShopModal">
      <div style="padding:30px">
        <div>
          <b-row>
            <b-colxx cols="8">
              <h1>{{$t('shops.add-shop')}}</h1>
            </b-colxx>
            <b-colxx cols="4" class="text-right">
              <a href="#" @click="$modal.hide('addShopModal')">
                <h1>
                  <i class="simple-icon-close"></i>
                </h1>
              </a>
            </b-colxx>
          </b-row>
        </div>

        <b-row>
          <b-col>
            <b-form-group :label="$t('shops.name')">
              <b-form-input v-model="newItem.name" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label="$t('shops.address')">
              <b-form-input v-model="newItem.address" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group>
          <div class="float-sm-right">
            <b-button
              @click="$modal.hide('addShopModal')"
              variant="light"
              size="lg"
            >{{$t('layouts.cancel')}}</b-button>
            <b-button @click="addShop" variant="primary" :disabled="processing" size="lg">
              <i v-if="processing" class="loader"></i>
              <span v-if="!processing">{{$t('shops.add')}}</span>
            </b-button>
          </div>
        </b-form-group>
      </div>
    </modal>
    <!-- End of Add Shop Modal -->
  </b-row>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import shopApi from "../../api/shop";
import userApi from "../../api/user";

export default {
  data() {
    return {
      phone: "",
      password: "",
      newItem: {},
      user: {
        shops: []
      }
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapGetters(["currentUser", "currentShop", "processing", "loginError"])
  },

  methods: {
    ...mapActions(["shopLogin", "getCurrentUser", "register"]),
    loadData() {
      userApi
        .getCurrentUser()
        .then(res => {
          // console.log(res);
          this.user = res.data;
        })
        .catch(error => {
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    selectShop(shop) {
      this.shopLogin(shop);
    },
    addShop() {
      this.processing = true;
      this.newItem.user = this.currentUser.user.id;
      shopApi
        .create(this.newItem)
        .then(res => {
          this.$modal.hide("addShopModal");
          this.processing = false;

          this.$notify(
            "success",
            "Added Successfully",
            `Shop added successfully`,
            { duration: 3000, permanent: false }
          );
          this.$router.push("/");
        })
        .catch(error => {
          this.processing = false;
          this.$modal.hide("addShopModal");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    }
  },
  watch: {
    currentShop(val) {
      if (val && val.shop) {
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      }
    },
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });
      }
    }
  }
};
</script>
<style>
.loader {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border-top-color: rgba(0, 0, 0, 0.4);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  left: calc(50%);
  top: calc(50%);
  z-index: 1;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>

