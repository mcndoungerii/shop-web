<template>
  <nav class="navbar fixed-top">
    <a
      href="#"
      class="menu-button d-none d-md-block"
      @click.prevent="changeSideMenuStatus({step :menuClickCount+1,classNames:menuType})"
    >
      <menu-icon />
    </a>
    <a
      href="#"
      class="menu-button menu-button-mobile d-xs-block d-sm-block d-md-none"
      @click.prevent="changeSideMenuForMobile(menuType)"
    >
      <mobile-menu-icon />
    </a>
    <div
      :class="{'search':true, 'mobile-view':isMobileSearch}"
      ref="searchContainer"
      @mouseenter="isSearchOver=true"
      @mouseleave="isSearchOver=false"
    >
      <b-input
        :placeholder="$t('menu.search')"
        @keypress.native.enter="search"
        v-model="searchKeyword"
      />
      <span class="search-icon" @click="searchClick">
        <i class="simple-icon-magnifier"></i>
      </span>
    </div>
    <div class="d-inline-block">
      <b-dropdown
        id="langddm"
        class="ml-2"
        variant="light"
        size="sm"
        toggle-class="language-button"
      >
        <template slot="button-content">
          <span class="name">{{$i18n.locale.toUpperCase()}}</span>
        </template>
        <b-dropdown-item
          v-for="(l,index) in localeOptions"
          :key="index"
          @click="changeLocale(l.id)"
        >{{l.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <router-link class="navbar-logo" tag="a" to="/app">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
    </router-link>

    <div class="ml-auto">
      <div class="header-icons d-inline-block align-middle">
        <div class="position-relative d-none d-sm-inline-block">
          <b-dropdown
            variant="empty"
            size="sm"
            right
            toggle-class="header-icon"
            menu-class="position-absolute mt-3 iconMenuDropdown"
            no-caret
          >
            <template slot="button-content">
              <i class="simple-icon-grid" />
            </template>
            <div>
              <router-link tag="a" to="/app/dashboards/default" class="icon-menu-item">
                <i class="iconsmind-Shop-4 d-block" />
                {{$t('menu.dashboards')}}
              </router-link>
              <router-link tag="a" to="/app/ui" class="icon-menu-item">
                <i class="iconsmind-Pantone d-block" />
                {{$t('menu.ui')}}
              </router-link>
              <router-link tag="a" to="/app/ui/charts" class="icon-menu-item">
                <i class="iconsmind-Bar-Chart d-block" />
                {{$t('menu.charts')}}
              </router-link>
              <router-link tag="a" to="/app/applications/chat" class="icon-menu-item">
                <i class="iconsmind-Speach-BubbleDialog d-block" />
                {{$t('menu.chat')}}
              </router-link>
              <router-link tag="a" to="/app/applications/survey" class="icon-menu-item">
                <i class="iconsmind-Formula d-block" />
                {{$t('menu.survey')}}
              </router-link>
              <router-link tag="a" to="/app/applications/todo" class="icon-menu-item">
                <i class="iconsmind-Check d-block" />
                {{$t('menu.todo')}}
              </router-link>
            </div>
          </b-dropdown>
        </div>

        <!--<div  class="position-relative d-inline-block">-->
        <!--<b-dropdown variant="empty" size="sm" right toggle-class="header-icon notificationButton" menu-class="position-absolute mt-3 notificationDropdown" no-caret>-->
        <!--<template slot="button-content">-->
        <!--<i class="simple-icon-bell" />-->
        <!--<span class="count">3</span>-->
        <!--</template>-->
        <!--<vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }"  >-->
        <!--<div class="d-flex flex-row mb-3 pb-3 border-bottom" v-for="(n,index) in notifications" :key="index">-->
        <!--<router-link tag="a" to="/app/layouts/details">-->
        <!--<img :src="n.img" :alt="n.title" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"/>-->
        <!--</router-link>-->
        <!--<div  class="pl-3 pr-2">-->
        <!--<router-link tag="a" to="/app/layouts/details">-->
        <!--<p  class="font-weight-medium mb-1">{{n.title}}</p>-->
        <!--<p  class="text-muted mb-0 text-small">{{n.date}}</p>-->
        <!--</router-link>-->
        <!--</div>-->
        <!--</div>-->
        <!--</vue-perfect-scrollbar>-->
        <!--</b-dropdown>-->
        <!--</div>-->

        <b-button
          variant="empty"
          class="header-icon d-none d-sm-inline-block"
          @click="toggleFullScreen"
        >
          <i
            :class="{'d-block':true,'simple-icon-size-actual':fullScreen,'simple-icon-size-fullscreen':!fullScreen }"
          />
        </b-button>
      </div>
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-1"
          no-caret
        >
          <template slot="button-content">
            <span class="name mr-1">{{currentUser.user.fullName}}</span>
            <span>
              <img
                v-if="currentUser.user.avatar"
                :alt="currentUser.user.fullName"
                :src="currentUser.user.avatar"
              />
              <img
                v-if="!currentUser.user.avatar"
                :alt="currentUser.user.fullName"
                src="/assets/img/avatar.jpg"
              />
            </span>
          </template>
          <!-- <b-dropdown-item>Account</b-dropdown-item> -->
          <div style="margin:5px; width:200px">
            <b-dropdown-item @click="showMyProfile">{{$t('menu.myprofile')}}</b-dropdown-item>
            <!--<b-dropdown-item>Support</b-dropdown-item>-->
            <b-dropdown-divider />
            <b-dropdown-item @click="logout()">{{$t('menu.signout')}}</b-dropdown-item>
          </div>
        </b-dropdown>
      </div>
    </div>
    <modal height="auto" :adaptive="true" name="modalMyProfile">
      <div style="padding:30px">
        <div>
          <b-row>
            <b-colxx cols="8">
              <h1>{{$t('menu.myprofile')}}</h1>
            </b-colxx>
            <b-colxx cols="4" class="text-right">
              <a href="#" @click="$modal.hide('modalMyProfile')">
                <h1>
                  <i class="simple-icon-close"></i>
                </h1>
              </a>
            </b-colxx>
          </b-row>
        </div>
        <b-form-group :label="$t('user.fullname')">
          <b-form-input v-model="newItem.fullName" />
        </b-form-group>
        <b-form-group :label="$t('user.phone')">
          <b-form-input v-model="newItem.phone" />
        </b-form-group>
        <b-form-group>
          <div class="float-sm-right">
            <b-button
              @click="$modal.hide('modalMyProfile')"
              variant="light"
              size="lg"
              style="margin:5px"
            >{{$t('layouts.cancel')}}</b-button>
            <b-button
              @click="addNewItem"
              variant="primary"
              size="lg"
              style="margin:5px"
            >{{$t('button.edit')}}</b-button>
            <b-button
              @click="resetPassword"
              variant="primary"
              size="lg"
              style="margin:5px"
            >{{$t('button.reset-password')}}</b-button>
          </div>
        </b-form-group>
      </div>
    </modal>
    <modal height="auto" :adaptive="true" name="modalResetPassword">
      <div style="padding:30px">
        <div>
          <b-row>
            <b-colxx cols="8">
              <h1>{{$t('user.reset-password')}}</h1>
            </b-colxx>
            <b-colxx cols="4" class="text-right">
              <a href="#" @click="$modal.hide('modalResetPassword')">
                <h1>
                  <i class="simple-icon-close"></i>
                </h1>
              </a>
            </b-colxx>
          </b-row>
        </div>
        <b-form-group :label="$t('user.old-password')">
          <b-form-input v-model="newItemP.password" :type="type" />
        </b-form-group>
        <b-form-group :label="$t('user.new-password')">
          <b-form-input v-model="newItemP.newPassword" :type="type" />
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            @input="showPassword"
            variant="primary"
          >{{ btnText === 'Show Password'?$t('users.show-password'): $t('users.hide-password') }}</b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <div class="float-sm-right">
            <b-button
              @click="$modal.hide('modalResetPassword')"
              variant="light"
              size="lg"
              style="margin:5px"
            >{{$t('layouts.cancel')}}</b-button>
            <b-button @click="resetPasswordAPIMethod" variant="primary">{{$t('button.reset')}}</b-button>
          </div>
        </b-form-group>
      </div>
    </modal>
  </nav>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "components/Svg";
import userApi from "../api/user.js";

import notifications from "data/notifications";
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl
} from "constants/config";

export default {
  components: {
    MenuIcon,
    MobileMenuIcon
  },
  data() {
    return {
      selectedParentMenu: "",
      searchKeyword: "",
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      localeOptions,
      buyUrl,
      notifications,
      newItem: {},
      newItems: [],
      newItemP: {},
      type: "password",
      btnText: "Show Password",
      currentShopId: null
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut"]),
    showMyProfile() {
      let newItem = { fullName: this.fullName, phone: this.phone };
      this.$set((this.newItem = this.currentUser.user));
      this.$modal.show("modalMyProfile");
    },
    addNewItem() {
      this.newItem.shopAssigned = this.currentShopId;
      delete this.newItem.shops;
      userApi
        .update(this.newItem)
        .then(res => {
          console.log(res.data);
          this.$modal.hide("modalMyProfile");
          this.$notify(
            "success",
            "Success",
            `${res.data[0]["fullName"]} updated successfully`,
            {
              duration: 3000,
              permanent: false
            }
          );
        })
        .catch(error => {
          console.log(error);
          this.$modal.hide("modalMyProfile");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    resetPassword() {
      this.newItemP = this.currentUser.user;
      this.$modal.show("modalResetPassword");
    },
    resetPasswordAPIMethod() {
      this.newItemP = this.currentUser.user;
      if (this.newItemP.password !== this.newItemP.newPassword) {
        userApi
          .resetPassword(this.newItemP)
          .then(res => {
            console.log(res);
            this.$modal.hide("modalResetPassword");
            this.$modal.hide("modalMyProfile");
            this.$notify(
              "success",
              "Success",
              `Password successfully updated!`,
              {
                duration: 3000,
                permanent: false
              }
            );
          })
          .catch(error => {
            console.log(error);
            this.$modal.hide("modalResetPassword");
            this.$notify("error", "Error!", `Your password is not matched`, {
              duration: 3000,
              permanent: false
            });
          });
      } else {
        let error = new Error();
        console.log(error);
        this.$notify(
          "error",
          "Error!",
          `Your New Password should not match Old Password`,
          {
            duration: 3000,
            permanent: false
          }
        );
      }
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
    search() {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`);
      this.searchKeyword = "";
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true;
        } else {
          this.search();
          this.isMobileSearch = false;
        }
      } else {
        this.search();
      }
    },
    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false;
        this.searchKeyword = "";
      }
    },
    changeLocale(locale) {
      this.setLang(locale);
    },
    logout() {
      this.signOut().then(() => {
        this.$router.push("/user/login");
      });
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      currentShop: "currentShop",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount"
    })
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  mounted() {
    this.currentShopId = this.currentShop.id;
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from != to) {
        this.$router.go(this.$route.path);
      }
    },
    isMobileSearch(val) {
      if (val) {
        document.addEventListener("click", this.handleDocumentforMobileSearch);
      } else {
        document.removeEventListener(
          "click",
          this.handleDocumentforMobileSearch
        );
      }
    }
  }
};
</script>
