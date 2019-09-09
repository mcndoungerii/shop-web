<template>
  <b-colxx class>
    <b-row>
      <b-col>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('menu.reports') }}</h1>
            <piaf-breadcrumb />
            <div class="float-sm-right">
              <b-button
                style="width: 100%;"
                variant="primary"
                size="lg"
                class="top-right-button"
              >Print/Export</b-button>

              <!-- Show Report Modal -->
              <modal
                :clickToClose="false"
                :scrollable="true"
                height="auto"
                :adaptive="true"
                name="modalShowReport"
              >
                <div v-if="viewItem" style="padding:30px">
                  <div>
                    <b-row>
                      <b-colxx cols="8">
                        <h1>{{'View Product'}}</h1>
                      </b-colxx>
                      <b-colxx cols="4" class="text-right">
                        <a href="#" @click="$modal.hide('modalShowReport')">
                          <h1>
                            <i class="simple-icon-close"></i>
                          </h1>
                        </a>
                      </b-colxx>
                    </b-row>
                  </div>
                  <b-row>
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Product Name</p>
                              <p class="list-item-heading mb-1">{{viewItem.name}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Branch</p>
                              <p class="list-item-heading mb-1">{{viewItem.branch.name}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Seller</p>
                              <p class="list-item-heading mb-1">{{viewItem.user.fullName}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>

                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Supplier</p>
                              <p class="list-item-heading mb-1">{{viewItem.supplier.name}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Total</p>
                              <p class="list-item-heading mb-1">{{viewItem.totalSales}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">Branch</p>
                              <p class="list-item-heading mb-1">{{viewItem.branch.name}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-form-group>
                    <div class="float-sm-right">
                      <b-button
                        @click="$modal.hide('modalShowReport')"
                        variant="outline-secondary"
                        size="lg"
                        style="margin:5px"
                      >Cancel</b-button>
                    </div>
                  </b-form-group>
                </div>
              </modal>
              <!-- End of Show Report Modal -->
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
              :title="'Product Details'"
              class="modal-right"
            >
              <div v-if="selectedItem">
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Product Name</p>
                        <p class="list-item-heading mb-1">{{selectedItem.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.seller" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Seller Name</p>
                        <p class="list-item-heading mb-1">{{selectedItem.user.fullName}}</p>
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
                        <p class="mb-1 text-muted text-small">Total</p>
                        <p class="list-item-heading mb-1">Tsh {{selectedItem.totalSales}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="selectedItem.branch" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Branch Name</p>
                        <p class="list-item-heading mb-1">{{selectedItem.branch.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.supplier" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Supplier Name</p>
                        <p class="list-item-heading mb-1">{{selectedItem.supplier.name}}</p>
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
                        <p class="mb-1 text-muted text-small">Date Created</p>
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
                <b-button variant="primary" class="mr-1" @click="showReport()">View Report</b-button>
              </template>
            </b-modal>
          </b-colxx>
        </b-row>
        <b-card style="margin-bottom:20px">
          <b-row>
            <b-col style="margin-left: 8px;">
              <b-form-group label="Branches">
                <v-select v-model="selectedBranch" :options="branches" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 9px;">
              <b-form-group label="Seller">
                <v-select
                  @input="clickSeller"
                  v-model="selectedSeller"
                  :options="sellers"
                  label="fullName"
                >
                  <template slot="option" slot-scope="option">{{ option.fullName }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 8px;">
              <b-form-group label="Date">
                <v-date-picker
                  @input="clickDate"
                  mode="range"
                  v-model="selectedValueRange"
                  :input-props="{ class: 'form-control', placeholder: $t('form-components.date-range')}"
                ></v-date-picker>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 8px;">
              <b-form-group label="Product">
                <v-select v-model="selectedProduct" :options="items" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 8px;">
              <b-form-group label="Supplier">
                <v-select v-model="selectedSupplier" :options="suppliers" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-button
              style=" margin: 25px; padding: 10px;"
              variant="secondary"
              size="lg"
              class="top-right-button"
            >Filter</b-button>
            <b-col style="margin-left: 8px;">
              <div>
                <p class="text-left text-medium">Total Income:</p>
                <h2 class="ml-1 text-left card-subtitle truncate">Tsh</h2>
              </div>
            </b-col>
          </b-row>
        </b-card>
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
import DataListItem from "components/Listing/Report/DataListItem";
import reportApi from "../../../api/report";
import branchApi from "../../../api/branch";
import supplierApi from "../../../api/supplier";
import userApi from "../../../api/user";
import saleApi from "../../../api/sale";

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
      branches: [],
      selectedBranch: null,

      selectedItem: null,
      statuses: [
        { text: "ON HOLD", value: "ON HOLD" },
        { text: "PROCESSED", value: "PROCESSED" }
      ],

      sellers: [],
      selectedSeller: null,
      selectedProduct: null,
      income: [],
      selectedValueRange: {
        start: new Date(2018, 12, 9),
        end: new Date(2018, 12, 18)
      },
      selectedSupplier: null,
      suppliers: [],
      viewItem: null
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        reportApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.items = res.data.products;
          this.selectedItems = [];
          branchApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.branches = results.data.branches;
            });
          supplierApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.suppliers = results.data.suppliers;
            });
          userApi
            .list(
              `?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100&role=SELLER`
            )
            .then(results => {
              this.sellers = results.data.users;
            });

          this.isLoad = true;
        });
    },

    clickSeller() {
      console.log(this.selectedSeller);
    },
    clickDate() {
      console.log(this.selectedValueRange);
    },

    showReport() {
      this.viewItem = this.selectedItem;

      this.$modal.show("modalShowReport");
      this.$refs.modalright.hide();
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
        return `?sortBy='${this.sort.column}'&sortOrder=DESC&skip=${skip}&limit=${this.perPage}`;
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
    this.loadItems();
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
