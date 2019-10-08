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
              >{{$t('button.print-export')}}</b-button>

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
                        <h1>{{$t('report.view-report')}}</h1>
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
                    <b-col v-if="viewItem.receiptnumber">
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">{{$t('report.receipt-number')}}</p>
                              <p class="list-item-heading mb-1">{{viewItem.receiptnumber}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col v-if="viewItem.quantity">
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">{{$t('report.quantity')}}</p>
                              <p class="list-item-heading mb-1">{{viewItem.quantity}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col v-if="viewItem.productname">
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">{{$t('report.product-name')}}</p>
                              <p class="list-item-heading mb-1">{{viewItem.productname}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>

                    <b-col v-if="viewItem.shopname">
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">{{$t('report.shop-name')}}</p>
                              <p class="list-item-heading mb-1">{{viewItem.shopname}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row v-if="viewItem.total">
                    <b-col>
                      <div class="mb-3 pb-3 border-bottom border-bottom">
                        <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                          <div
                            class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                          >
                            <div class="w-40 w-sm-100">
                              <p class="mb-1 text-muted text-small">{{$t('report.total')}}</p>
                              <p
                                class="list-item-heading mb-1"
                              >Tsh {{viewItem.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} /=</p>
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
                      >{{$t('layouts.cancel')}}</b-button>
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
              :title="$t('report.report-details')"
              class="modal-right"
            >
              <div v-if="selectedItem">
                <div
                  v-if="selectedItem.receiptnumber"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('report.receipt-number')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.receiptnumber}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.quantity" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('report.quantity')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.quantity}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.shopname" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('report.shop-name')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.shopname}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.productname" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('report.product-name')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.productname}}</p>
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
                        <p class="mb-1 text-muted text-small">{{$t('report.seller')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.seller}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.total" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('report.total')}}</p>
                        <p
                          class="list-item-heading mb-1"
                        >Tsh {{selectedItem.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} /=</p>
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
                        <p class="mb-1 text-muted text-small">{{$t('report.createdAt')}}</p>
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
                  @click="showReport()"
                >{{ $t('button.view') }}</b-button>
              </template>
            </b-modal>
          </b-colxx>
        </b-row>
        <b-card style="margin-bottom:20px">
          <b-row>
            <b-col style="margin-left: 8px;" v-if="shops.length>0">
              <b-form-group :label="$t('report.shops')">
                <v-select v-model="selectedShop" :options="shops" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 9px;" v-if="sellers.length>0">
              <b-form-group :label="$t('report.seller')">
                <v-select v-model="selectedSeller" :options="sellers" label="fullName">
                  <template slot="option" slot-scope="option">{{ option.fullName }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="2" style="margin-left: 8px;">
              <b-form-group :label="$t('report.date')">
                <v-date-picker
                  @input="clickDate"
                  mode="range"
                  v-model="selectedValueRange"
                  :input-props="{ class: 'form-control', placeholder: $t('form-components.date-range')}"
                ></v-date-picker>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 9px;" v-if="products.length>0">
              <b-form-group :label="$t('report.product')">
                <v-select v-model="selectedProduct" :options="products" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col style="margin-left: 8px;">
              <b-form-group :label="$t('report.report-view')">
                <v-select v-model="selectedView" :options="views" label="name">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="1" style="margin-left: 8px;">
              <b-form-group :label="$t('report.itemize')">
                <b-form-checkbox v-model="itemize">{{$t('report.itemize-check')}}</b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="2" style="margin-left: 8px;">
              <b-button
                @click="clickClearFilter"
                style=" margin: 25px; padding: 10px; "
                variant="secondary"
                class="top-right-button"
                size="sm"
              >{{$t('button.clear-filters')}}</b-button>
            </b-col>
            <b-col cols="2" style="margin-left: 8px;">
              <div>
                <p class="text-left text-medium">{{$t('report.total-income')}}:</p>
                <h2
                  class="ml-1 text-left card-subtitle truncate"
                >Tsh {{totalsales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} /=</h2>
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
import shopApi from "../../../api/shop";
import productApi from "../../../api/product";
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
      shops: [],
      selectedShop: null,
      categories: [],
      itemize: false,
      selectedCategory: null,
      newCategory: {},
      packages: [],
      selectedPackage: {},
      selectedItem: null,
      statuses: [
        { text: "ON HOLD", value: "ON HOLD" },
        { text: "PROCESSED", value: "PROCESSED" }
      ],
      newItem: {
        isCreditable: false
      },
      selectedPredefinedProduct: {},
      preproducts: [],
      products: [],
      newPreProduct: {},
      selectedPreCategory: null,
      sellers: [],
      selectedSeller: null,
      selectedProduct: null,
      income: [],
      totalsales: 0,
      selectedValueRange: {
        start: new Date(moment().startOf("year")),
        end: new Date()
      },
      selectedView: { name: "Daily Sales", value: "daily" },
      views: [
        { name: "Weekly Sales", value: "weekly" },
        { name: "Monthly Sales", value: "monthly" },
        { name: "Quaterly Sales", value: "quaterly" },
        { name: "Annually Sales", value: "annually" }
      ],
      viewItem: null
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        reportApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.totalsales = res.data.totalSales;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.items = res.data.data;
          this.selectedItems = [];
          shopApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.shops = results.data.shops;
            });
          productApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.products = results.data.products;
            });
          userApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
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
    clickProduct() {
      console.log(this.selectedProduct);
    },
    clickView() {
      console.log(this.selectedView);
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
    addNewCategory() {
      this.processing = true;
      productApi
        .createCategory(this.newCategory)
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddCategory");
          this.categories.push(res.data);
          this.$notify(
            "success",
            "Success",
            `${res.data.name} created successfully`,
            { duration: 3000, permanent: false }
          );
          this.$modal.show("modalAddPredefinedProduct");
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("modalAddCategory");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
          this.$modal.show("modalAddPredefinedProduct");
        });
    },
    onSelectedProduct(selectedPredefinedProduct) {
      this.$set(this.newItem.name, this.selectedPredefinedProduct.name);
      this.$set(
        this.newItem.description,
        this.selectedPredefinedProduct.description
      );
    },
    addNewPreProduct() {
      this.processing = true;
      this.newPreProduct.category = this.selectedPreCategory.id;
      preproductApi
        .create(this.newPreProduct)
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddPredefinedProduct");
          this.categories.push(res.data);
          this.$notify(
            "success",
            "Success",
            `${res.data.name} created successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("modalAddPredefinedProduct");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    addNewItem() {
      let data = Object.assign({}, this.newItem);
      data.name = this.selectedPredefinedProduct.name;
      data.description = this.selectedPredefinedProduct.description;
      data.shop = this.selectedShop.id;
      data.category = this.selectedCategory.id;
      data.predefinedProduct = this.selectedPredefinedProduct.id;
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
    clickClearFilter() {
      this.selectedShop = null;
      this.selectedSeller = null;
      this.selectedProduct = null;
      selectedValueRange = {
        start: new Date(moment().startOf("year")),
        end: new Date()
      };
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
        return `?sortBy='${
          this.sort.column
        }'&sortOrder=DESC&skip=${skip}&limit=${this.perPage}${
          this.search !== "" ? "&contains=" + this.search : ""
        }&view=${this.selectedView.value}${
          this.selectedShop !== null ? "&shop=" + this.selectedShop.id : ""
        }${
          this.selectedSeller !== null ? "&user=" + this.selectedSeller.id : ""
        }${
          this.selectedProduct !== null
            ? "&product=" + this.selectedProduct.id
            : ""
        }${
          this.selectedValueRange !== null
            ? "&fromDate=" +
              this.selectedValueRange.start +
              "&toDate=" +
              this.selectedValueRange.end
            : ""
        }${this.itemize ? "&itemize=" + true : ""}`;
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
