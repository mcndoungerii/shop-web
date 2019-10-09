<template>
  <b-colxx class>
    <b-row>
      <b-col>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('menu.shopProducts') }}</h1>
            <piaf-breadcrumb />
            <div class="float-sm-right">
              <b-button
                style="width: 100%;"
                @click="callAddModal"
                variant="primary"
                size="lg"
                class="top-right-button"
              >{{ $t('product.add-product') }}</b-button>

              <!-- Add Product Modal -->
              <modal
                :clickToClose="false"
                :scrollable="true"
                height="auto"
                :adaptive="true"
                name="modalAddProduct"
              >
                <div style="padding:30px">
                  <div>
                    <b-row>
                      <b-colxx cols="8">
                        <h1>{{newItem.id !== undefined?$t('product.edit-product'):$t('product.add-product')}}</h1>
                      </b-colxx>
                      <b-colxx cols="4" class="text-right">
                        <a href="#" @click="$modal.hide('modalAddProduct')">
                          <h1>
                            <i class="simple-icon-close"></i>
                          </h1>
                        </a>
                      </b-colxx>
                    </b-row>
                  </div>
                  <b-form>
                    <b-form-group :label="$t('product.name')">
                      <v-select
                        :scrollable="true"
                        label="name"
                        v-model="newItem.product"
                        :options="products"
                      >
                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                      </v-select>
                    </b-form-group>

                    <b-form-group>
                      <div class="float-sm-right">
                        <b-button
                          v-if="newItem.id"
                          @click="deleteProduct"
                          variant="danger"
                          size="lg"
                          style="margin:5px"
                        >{{$t('button.delete')}}</b-button>
                        <b-button
                          @click="$modal.hide('modalAddProduct')"
                          variant="outline-secondary"
                          size="lg"
                          style="margin:5px"
                        >{{$t('layouts.cancel')}}</b-button>
                        <b-button
                          @click="addToShopMethod"
                          variant="primary"
                          :disabled="processing"
                          size="lg"
                          style="margin:5px"
                        >
                          <i v-if="processing" class="loader"></i>
                          <span
                            v-if="!processing"
                          >{{newItem.id? $t('button.edit') : $t('button.add')}}</span>
                        </b-button>
                      </div>
                    </b-form-group>
                  </b-form>
                </div>
              </modal>
              <!-- End of Add Product Modal -->
            </div>
            <div class="mb-2 mt-2">
              <b-button
                variant="empty"
                class="pt-0 pl-0 d-inline-block d-md-none"
                v-b-toggle.displayOptions
              >
                {{ $t('layouts.display-options') }}
                <i class="simple-icon-arrow-down align-middle" />
              </b-button>
              <b-collapse id="displayOptions" class="d-md-block">
                <span class="mr-3 mb-2 d-inline-block float-md-left">
                  <a
                    :class="{'mr-2 view-icon':true,'active': displayMode==='list'}"
                    @click="changeDisplayMode('list')"
                  >
                    <data-list-icon />
                  </a>
                </span>
                <div class="d-block d-md-inline-block mb-2">
                  <b-dropdown
                    id="ddown1"
                    :text="`${$t('layouts.orderby')} ${sort.label}`"
                    variant="outline-dark"
                    class="mr-1 float-md-left btn-group"
                    size="xs"
                  >
                    <b-dropdown-item
                      v-for="(order,index) in sortOptions"
                      :key="index"
                      @click="changeOrderBy(order)"
                    >{{ order.label }}</b-dropdown-item>
                  </b-dropdown>

                  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                    <b-input :placeholder="$t('menu.search')" v-model="search" />
                  </div>
                </div>
                <div class="float-md-right">
                  <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>
                  <b-dropdown
                    id="ddown2"
                    right
                    :text="`${perPage}`"
                    variant="outline-dark"
                    class="d-inline-block"
                    size="xs"
                  >
                    <b-dropdown-item
                      v-for="(size,index) in pageSizes"
                      :key="index"
                      @click="changePageSize(size)"
                    >{{ size }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-collapse>
            </div>
            <div class="separator mb-5" />
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('product.product-details')"
              class="modal-right"
            >
              <div v-if="selectedItem">
                <div
                  v-if="selectedItem.taxPercentage"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.taxPercentage')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.taxPercentage}} %</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.createdAt')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.createdAt | humanDate}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalright')"
                >{{ $t('layouts.cancel') }}</b-button>
                <b-button
                  variant="primary"
                  class="mr-1"
                  @click="showEditProductModal()"
                >{{$t('button.edit')}}</b-button>
              </template>
            </b-modal>
          </b-colxx>
        </b-row>
        <template v-if="isLoad">
          <b-row key="list">
            <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
              <data-list-item
                :key="item.id"
                :data="item"
                :selected-items="selectedItems"
                @toggle-item="toggleItem"
                @click-item="clickItem"
                v-contextmenu:contextmenu
              />
            </b-colxx>
          </b-row>
          <b-row v-if="lastPage>1">
            <b-colxx xxs="12">
              <b-pagination-nav
                :number-of-pages="lastPage"
                :link-gen="linkGen"
                v-model="page"
                :per-page="perPage"
                align="center"
                next-text="<i class='simple-icon-arrow-right' />"
                prev-text="<i class='simple-icon-arrow-left' />"
                first-text="<i class='simple-icon-control-start' />"
                last-text="<i class='simple-icon-control-end' />"
              />
            </b-colxx>
          </b-row>
        </template>
        <template v-else>
          <div class="loading"></div>
        </template>
        <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
          <v-contextmenu-item @click="onContextCopy()">
            <i class="simple-icon-docs" />
            <span>Copy</span>
          </v-contextmenu-item>
          <v-contextmenu-item @click="onContextArchive()">
            <i class="simple-icon-drawer" />
            <span>Move to archive</span>
          </v-contextmenu-item>
          <v-contextmenu-item @click="onContextDelete()">
            <i class="simple-icon-trash" />
            <span>Delete</span>
          </v-contextmenu-item>
        </v-contextmenu>
      </b-col>
    </b-row>
  </b-colxx>
</template>
<script>
import { DataListIcon, ThumbListIcon, ImageListIcon } from "components/Svg";
import vSelect from "vue-select";
import DataListItem from "components/Listing/ShopProduct/DataListItem";
import shopProductApi from "../../../api/shopproduct";
import shopApi from "../../../api/shop";
import productApi from "../../../api/product";
import supplierApi from "../../../api/supplier";

let moment = require("moment");
export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    DataListItem
  },
  data() {
    return {
      isLoad: false,
      processing: false,
      displayMode: "list",
      sort: { column: "createdAt", label: "Date Added" },
      sortOptions: [{ column: "createdAt", label: "Date Added" }],
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      pageSizes: [4, 8, 12],
      selectedItems: [],
      products: [],
      shops: [],
      selectedShop: null,
      categories: [],
      selectedCategory: null,
      newCategory: {},
      packages: [],
      selectedPackage: {},
      selectedItem: null,
      statuses: [
        { text: "ON HOLD", value: "ON HOLD" },
        { text: "PROCESSED", value: "PROCESSED" }
      ],
      newItem: {},
      selectedSupplier: null,
      suppliers: [],
      selectedPredefinedProduct: null,
      currentShopId: null
    };
  },
  methods: {
    loadItems(currentShopId) {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        shopProductApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.currentShopId = this.$route.params.id;
          this.items = res.data.products;
          console.log(res.data);
          this.selectedItems = [];
          productApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.products = results.data.products;
            });

          this.isLoad = true;
        });
    },
    callAddModal() {
      this.newItem = {};
      this.$modal.show("modalAddProduct");
    },
    showPredefinedProductModal() {
      this.$modal.show("modalAddToShop");
    },
    showCategoryModal() {
      this.$modal.hide("modalAddToShop");
      this.$modal.show("modalAddCategory");
    },
    closeModalCategory() {
      this.$modal.hide("modalAddCategory");
      this.$modal.show("modalAddToShop");
    },

    deleteProduct() {
      this.processing = true;
      let items = [];
      items.push(this.newItem.id);
      productApi
        .delete({ items: items })
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddProduct");
          this.$notify(
            "success",
            "Deleted Successfully",
            `Product deleted successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          this.processing = false;
          console.log(error);
          this.$notify("error", "Error!", error.message, {
            duration: 3000,
            permanent: false
          });
        });
    },

    hideModal(refname) {
      this.$refs[refname].hide();
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },

    addToShopMethod() {
      this.processing = true;

      productApi
        .addToShop({
          productId: this.newItem.product.id,
          shopId: this.currentShopId
        })
        .then(res => {
          console.log(res.data);
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddProduct");
          // this.preproducts.push(res.data);
          this.$notify(
            "success",
            "Success",
            `${res.data.product.name} created successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("modalAddToShop");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x != itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    clickItem(event, item) {
      this.selectedItem = item;
      this.$refs.modalright.show();
    },
    handleContextmenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextCopy() {
      console.log(
        "context menu item clicked - Copy Items: ",
        this.selectedItems
      );
    },
    onContextArchive() {
      console.log(
        "context menu item clicked - Move to Archive Items: ",
        this.selectedItems
      );
    },
    onContextDelete() {
      console.log(
        "context menu item clicked - Delete Items: ",
        this.selectedItems
      );
    },
    linkGen(pageNum) {
      return "#page-" + pageNum;
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
    apiUrl() {
      let skip = this.page === 1 ? 0 : (this.page - 1) * this.perPage;
      if (this.perPage !== undefined)
        return `${
          this.currentShopId !== null ? this.currentShopId : ""
        }?sortBy='${this.sort.column}'&sortOrder=DESC&skip=${skip}&limit=${
          this.perPage
        }`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.currentShopId = this.$route.params.id;
      console.log(this.$route.params.id);
      this.loadItems(this.$route.params.id);
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
<style>
.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999 !important;
  opacity: 1;
}
.margin-bottom {
  margin-bottom: 15px;
}
</style>
